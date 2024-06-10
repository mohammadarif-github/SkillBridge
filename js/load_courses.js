async function load_courses() {
  try {
    const url = "https://skillbridge-9i2p.onrender.com/main/courses";
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

function displayCourses(courses) {
    const coursesContainer = document.getElementById("course_container");
    coursesContainer.innerHTML = ""; // Clear any existing content
  
    courses.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.classList.add("bg-white", "rounded-xl", "shadow-md", "p-10", "m-10", "lg:h-98", "hover:shadow-xl");
  
      courseCard.innerHTML = `
        <h3 class="text-4xl font-semibold text-blue-400 mb-6 text-center">${course.Title}</h3>
        <ul class="text-gray-700 list-disc pl-6 text-left">
          <li>Main Features: ${course.Features}</li>
          <li>Duration: ${course.Duration} weeks</li>
          <li>Target: ${course.Target}</li>
          <ul class="text-center text-xl font-bold text-blue-700 mt-2">Price: $${course.Price}</ul>
        </ul>
        <button class="block mx-auto mt-6 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300">Buy Now</button>
      `;
  
      coursesContainer.appendChild(courseCard);
    });
  }
