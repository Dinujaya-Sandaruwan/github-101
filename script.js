document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic form validation
    const requiredFields = this.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#e74c3c";
        isValid = false;
      } else {
        field.style.borderColor = "#e1e5e9";
      }
    });

    if (isValid) {
      alert("Application submitted successfully! We will contact you soon.");
      // Here you would typically send the data to your server
      // this.submit();
    } else {
      alert("Please fill in all required fields.");
    }
  });

// Real-time validation feedback
document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", function () {
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.style.borderColor = "#e74c3c";
    } else {
      this.style.borderColor = "#e1e5e9";
    }
  });
});
