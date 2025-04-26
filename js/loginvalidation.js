document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const message = document.getElementById("login-message");
  
   
    emailInput.addEventListener("input", () => {
      const email = emailInput.value.trim();
      emailError.textContent = validateEmail(email) ? "" : "Enter a valid email.";
      emailError.style.color = "red" ;
    });
  
    passwordInput.addEventListener("input", () => {
      passwordError.textContent = passwordInput.value ? "" : "Password is required.";
      passwordError.style.color = "red" ;
    });
  
    form.addEventListener("submit", e => {
      e.preventDefault();
  
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
  
     
      message.textContent = "";
  
   
      if (!email || !password) {
        return showLoginMessage("Please fill in all fields.", "error");
      }
      if (!validateEmail(email)) {
        return showLoginMessage("Invalid email format.", "error");
      }
  
     
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email);
  
      if (!user) {
        return showLoginMessage("No account found with this email.", "error");
      }
      if (user.password !== password) {
        return showLoginMessage("Incorrect password.", "error");
      }
  
    
      showLoginMessage("Login successful!", "success");
  
      
      localStorage.setItem("currentUser", JSON.stringify(user));
  
    
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  
    function showLoginMessage(text, type) {
      message.textContent = text;
      message.style.color = type === "success" ? "green" : "red";
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  });