// Redirect if not logged in
if (!localStorage.getItem("authToken")) {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  window.location.href = "index.html";
});
