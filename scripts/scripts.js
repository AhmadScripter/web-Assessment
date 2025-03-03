// toggle theme functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const navbarToggleBtn = document.querySelector('.navbar-toggler');
  const toggleIcon = document.querySelector('.toggle-icon');

  console.log(navbarToggleBtn)
  // Check localStorage for saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    navbarToggleBtn.classList.add('white-btn');
    toggleIcon.classList.remove('fa-regular', 'fa-sun');
    toggleIcon.classList.add('fa-solid', 'fa-moon');
  }

  // toggle theme and save preference
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // toggle the icon
    if (isDarkMode) {
      toggleIcon.classList.remove('fa-regular', 'fa-sun');
      toggleIcon.classList.add('fa-solid', 'fa-moon');
    } else {
      toggleIcon.classList.remove('fa-solid', 'fa-moon');
      toggleIcon.classList.add('fa-regular', 'fa-sun');
    }
  });
});


// form validation code
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    let isValid = true;

    // validate Name
    const name = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    if (name.value.trim() === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // validate Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      emailError.textContent = "Enter a valid email.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // validate Message
    const message = document.getElementById("message");
    const messageError = document.getElementById("message-error");
    if (message.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    // prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault();
    }
  });
});
