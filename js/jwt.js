const API_URL = 'https://skillbridge-9i2p.onrender.com/'; 
const REFRESH_TOKEN_URL = `${API_URL}/user/token/refresh/`; 
 
async function refreshToken() { 
    const refreshToken = localStorage.getItem('refresh_token'); 
    if (!refreshToken) { 
        throw new Error('No refresh token available'); 
    } 
 
    const response = await fetch(REFRESH_TOKEN_URL, { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ refresh: refreshToken }) 
    }); 
 
    if (!response.ok) { 
        throw new Error('Failed to refresh token'); 
    } 
 
    const data = await response.json(); 
    localStorage.setItem('access_token', data.access); 
    return data.access; 
} 
 
async function fetchWithToken(url, options = {}) { 
    const accessToken = localStorage.getItem('access_token'); 
 
    if (!options.headers) { 
        options.headers = {}; 
    } 
 
    options.headers['Authorization'] = `Bearer ${accessToken}`; 
 
    let response = await fetch(url, options); 
 
    if (response.status === 401) { 
        try { 
            const newAccessToken = await refreshToken(); 
            options.headers['Authorization'] = `Bearer ${newAccessToken}`; 
            response = await fetch(url, options); 
        }  
        catch (error) { 
            console.error('Failed to refresh token', error); 
            window.location.href = 'login.html'; 
            return; 
        } 
    } 
 
    return response; 
} 
