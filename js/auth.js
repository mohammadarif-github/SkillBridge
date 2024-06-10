const Register = (event) => {
  event.preventDefault();

  const username = get_value("username");
  const first_name = get_value("first_name");
  const last_name = get_value("last_name");
  const email = get_value("email");
  const password = get_value("password");
  const confirm_password = get_value("password2");

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
  };

  if (password === confirm_password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_])[A-Za-z\d@$!%*#?&\-_]{8,}$/.test(
        password
      )
    ) {
      fetch("https://skillbridge-9i2p.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (data.username && data.username.includes("already exists.")) {
            document.getElementById("error").innerText =
              "Username already exists. Please choose a different one.";
          } else if (data.email && data.email.includes("already exists.")) {
            document.getElementById("error").innerText =
              "Email already exists. Please use a different one.";
          } else if (data.id) {
            document.getElementById("success").innerText =
              "Registration Successful!";
            alert(
              "Registration successful. Please login to enjoy all features."
            );
            window.location.href = "login.html";
          } else {
            document.getElementById("error").innerText = "Registration failed!";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          const errorData = JSON.parse(error.message);
          if (errorData.username) {
            // alert("Username already exists. Please choose a different one.");
            document.getElementById("error").innerText =
              "Username already exists. Please choose a different one.";
          } else if (errorData.email) {
            document.getElementById("error").innerText =
              "Email already exists. Please use a different one.";
          } else {
            document.getElementById("error").innerText =
              "An error occurred during registration.";
          }
        });
    } else {
      document.getElementById("error").innerText =
        "Password must contain eight characters, at least one letter, one number, and one special character (@, $, !, %, *, #, ?, &, -, _).";
    }
  } else {
    document.getElementById("error").innerText =
      "Password and Confirm Password do not match!";
  }
};

const Login = (event) => {
  event.preventDefault();
  const username = get_value("username");
  const password = get_value("password");

  const info = {
    username,
    password,
  };

  if (username && password) {
    fetch("https://skillbridge-9i2p.onrender.com/user/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.access && data.user_id) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("id", data.user_id);
          localStorage.setItem("authenticated", "true");
          document.getElementById("success").innerText = "Login Successful";
          alert("Login successful.");
          window.location.href = "index.html";
        } else {
          document.getElementById("error").innerText = "Wrong credentials!";
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        document.getElementById("error").innerText =
          "An error occurred during login.";
      });
  } else {
    document.getElementById("error").innerText =
      "Please enter username and password.";
  }
};

const Logout = () => {
  const token = localStorage.getItem("access_token");
  fetch("https://skillbridge-9i2p.onrender.com/user/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: localStorage.getItem("refresh_token"),
    }), // Send refresh token if needed
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("id"); // Remove user ID as well
      localStorage.setItem("authenticated", "false");
      alert("Logout successful.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout Error:", error);
      alert("An error occurred during logout.");
    });
};

if (localStorage.getItem("authenticated") == "true") {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("profile-icon").classList.remove("hidden");

  document.getElementById("sidebar-login").classList.add("hidden");
  document.getElementById("sidebar-signup").classList.add("hidden");
  document.getElementById("sidebar-profile-icon").classList.remove("hidden");
}

const get_value = (id) => {
  const value = document.getElementById(id).value;
  return value;
};
