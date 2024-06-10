async function loadDetails() {
  const id = localStorage.getItem("id");
  const url = `http://127.0.0.1:8000/user/profile/${id}/`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetchWithToken(url, options);
    if (response.ok) {
      const data = await response.json();
      showDetails(data);
    } else {
      console.error("Failed to fetch profile data:", response.status);
      // Optionally display an error message to the user
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Optionally display an error message to the user
  }
}
const showDetails = (data) => {
    // console.log(data);
    const is_super = data.is_superuser; // Example condition to check if the user is an admin
    const isAdmin = data.is_staff
  if (is_super) {
    document.getElementById("adminSection").classList.remove("hidden");
  }
  if(isAdmin || is_super) {
    document.getElementById("staffSection").classList.remove("hidden");
  }
  document.getElementById("username").innerText = data.username;
  document.getElementById("first_name").innerText = data.first_name;
  document.getElementById("last_name").innerText = data.last_name;
  document.getElementById("email").innerText = data.email;
};
// const redirectToEditProfile = () => {
//   window.location.href = `edit_profile.html`;
// };

async function load_courses() {
  try {
    const url = "http://127.0.0.1:8000/main/courses";
    const options = {
      method: "GET",
    };

    const response = await fetchWithToken(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    displayCourses(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

document.addEventListener("DOMContentLoaded", load_courses);

const displayCourses = (courses) => {
  coursesTbody.innerHTML = "";
    const id = localStorage.getItem("id")
  courses.forEach((course) => {
    if (id ==1 || course.Instructor.id == id) {
      // Check if the course's instructor ID matches the desired instructor ID
      const courseRow = document.createElement("tr");
      courseRow.className = "text-center";

      courseRow.innerHTML = `
        <td class="py-2 px-4 border-b">${course.Title}</td>
        <td class="py-2 px-4 border-b">${course.Instructor.username}</td>
        <td class="py-2 px-4 border-b">$${course.Price}</td>
        <td class="py-2 px-4 border-b">
          <button class="px-4 py-1 text-sm text-white bg-gray-500 rounded">See Details</button>
          <button class="mt-2 px-4 py-1 text-sm text-white bg-yellow-500 rounded">Edit</button>
          <button class="mt-2 px-4 py-1 text-sm text-white bg-red-500 rounded">Delete</button>
        </td>
      `;

      coursesTbody.appendChild(courseRow);
    }
  });
};

async function loadUsers() {
    try {
      const url = "http://127.0.0.1:8000/users/";
      const options = {
        method: "GET",
      };
  
      const response = await fetchWithToken(url, options);
      const data = await response.json();
  
      displayUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
  function displayUsers(users) {
    const usersTable = document.getElementById("usersTable");
  
    users.forEach(user => {
      const userRow = document.createElement("tr");
      userRow.className = "text-center";
  
      userRow.innerHTML = `
        <td class="py-2 px-4 border-b">${user.username}</td>
        <td class="py-2 px-4 border-b">${user.email}</td>
        <td class="py-2 pl-2 border-b">
          <button class="px-4 py-1 text-sm text-white bg-gray-500 rounded">Add as Instructor</button>
          <button class="mt-2 px-4 py-1 text-sm text-white bg-yellow-500 rounded">Edit</button>
          <button class="mt-2 px-4 py-1 text-sm text-white bg-red-500 rounded">Delete</button>
        </td>
      `;
  
      usersTable.appendChild(userRow);
    });
  }
  
  // Call the function to load and display users when needed
loadUsers();
  

loadDetails();
