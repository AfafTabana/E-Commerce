document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("user-icon");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser && userIcon) {
      userIcon.textContent = currentUser.name;
    }
  });