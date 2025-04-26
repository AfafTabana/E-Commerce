
document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');
const message = document.getElementById('message');


nameInput.addEventListener('input', () => {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.textContent = "Name is required.";
  } else if (!/^[a-zA-Z ]+$/.test(name)) {
    nameError.textContent = "Only letters and spaces allowed.";
  } else {
    nameError.textContent = "";
  }
});

emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    emailError.textContent = "Enter a valid email.";
  } else {
    emailError.textContent = "";
  }
});

passwordInput.addEventListener('input', () => {
  const pwd = passwordInput.value;
  const result = validatePassword(pwd);
  passwordError.textContent = result ? "" : 
    "Password must be 8+ chars, include uppercase, lowercase, number, and symbol.";
});

confirmInput.addEventListener('input', () => {
  confirmError.textContent = 
    confirmInput.value === passwordInput.value ? "" : "Passwords do not match.";
});

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
  }
  
  function validateEmail(email) {
    return /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-]+))*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
  }
  
  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  }
  

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;


  if (!name || !email || !password || !confirm) {
    return showMessage("All fields are required.", "red");
  }
  if (!/^[a-zA-Z ]+$/.test(name)) {
    return showMessage("Invalid name format.", "red");
  }
  if (!validateEmail(email)) {
    return showMessage("Invalid email.", "red");
  }
  if (!validatePassword(password)) {
    return showMessage("Weak password.", "red");
  }
  if (password !== confirm) {
    return showMessage("Passwords do not match.", "red");
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return showMessage("An account with this email already exists.", "red");
  }

  
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Registration successful!", "green");
  form.reset();
});

});