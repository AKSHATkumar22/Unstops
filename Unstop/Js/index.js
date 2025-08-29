// Redirect if already logged in
if (localStorage.getItem("authToken")) {
  window.location.href = "Home.html";
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async function () {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = true;

  // Validation
  document.getElementById("usernameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  if (username !== "emilys") {
    document.getElementById("usernameError").textContent =
      "Username must be 'emilys'.";
    valid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Enter a valid email (e.g., example@gmail.com).";
    valid = false;
  }

  if (password.length < 8) {
    document.getElementById("passwordError").textContent =
      "Password must be at least 8 characters.";
    valid = false;
  }

  if (!valid) return;

  // API Request
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        expiresInMins: 30,
      }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();

    // Save user data & token
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data));

    // Redirect to home
    window.location.href = "Home.html";
  } catch (error) {
    alert("Invalid credentials. Try again.");
  }
});
