const add_course = async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("id");
    const title = get_value("title");
    const price = get_value("price");
    const description = get_value("description");
    const features = get_value("features");
    const target = get_value("target");
    const duration = get_value("duration");

    const courseData = {
        Title: title,
        Price: price,
        Description: description,
        Features: features,
        Instructor: user_id,
        Duration: duration,
        Target: target
    };

    const url = "http://127.0.0.1:8000/main/courses/";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}` // Assuming token is stored in localStorage
        },
        body: JSON.stringify(courseData)
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
            alert("Course added successfully.");
            window.location.href = "index.html";
        } else {
            if (data.detail) {
                alert(data.detail); // Display error from server response
            } else {
                alert("Failed to add course.");
                console.log(data);
            }
        }
    } catch (error) {
        console.error('Error uploading course:', error);
        alert("An error occurred while adding the course.");
    }
};

const get_value = (id) => {
    return document.getElementById(id).value;
};

document.getElementById("submitBtn").addEventListener("click", add_course);
