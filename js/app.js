document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successDiv = document.querySelector(".success");
  const radioContainers = document.querySelectorAll(".radio-container");

  const toggleRadioSelection = (container) => {
    const input = container.querySelector('input[type="radio"]');
    if (input) {
      input.checked = true;
      radioContainers.forEach((c) => c.classList.remove("selected"));
      container.classList.add("selected");
    }
  };

  radioContainers.forEach((container) => {
    container.addEventListener("click", () => toggleRadioSelection(container));
  });

  const showSuccessMessage = () => {
    successDiv.style.display = "block";
    form.reset();
    clearErrorMessages();
    setTimeout(() => {
      successDiv.style.display = "none";
    }, 5000);
  };

  const showErrorMessage = (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) errorElement.textContent = message;
    if (inputElement) {
      inputElement.classList.add("error");
      inputElement.closest(".input-container")?.classList.add("error");
    }
  };

  const clearErrorMessages = () => {
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-container")
      .forEach((container) => container.classList.remove("error"));
    document
      .querySelectorAll("input, textarea")
      .forEach((el) => el.classList.remove("error", "success"));
  };

  const validateForm = () => {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const queryType = document.querySelector(
      'input[name="query-type"]:checked'
    );
    const consent = document.getElementById("consent").checked;

    clearErrorMessages();

    let isValid = true;

    if (!firstName) {
      showErrorMessage("first-name", "This field is required");
      isValid = false;
    } else {
      document.getElementById("first-name").classList.add("success");
    }

    if (!lastName) {
      showErrorMessage("last-name", "This field is required");
      isValid = false;
    } else {
      document.getElementById("last-name").classList.add("success");
    }

    if (!email) {
      showErrorMessage("email", "This field is required");
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showErrorMessage("email", "Please enter a valid email address");
        isValid = false;
      } else {
        document.getElementById("email").classList.add("success");
      }
    }

    if (!message) {
      showErrorMessage("message", "This field is required");
      isValid = false;
    } else {
      document.getElementById("message").classList.add("success");
    }

    if (!queryType) {
      showErrorMessage("query-type", "Please select a query type");
      isValid = false;
    }

    if (!consent) {
      showErrorMessage(
        "consent",
        "To submit this form, please consent to being contacted"
      );
      isValid = false;
    }

    return isValid;
  };

  form.addEventListener("submit", (event) => {
    if (!validateForm()) {
      event.preventDefault();
    } else {
      event.preventDefault();
      showSuccessMessage();
    }
  });

  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("mousedown", (event) => event.preventDefault());

  form.addEventListener("focusin", (event) => {
    if (event.pointerType === "mouse") {
      event.preventDefault();
      event.target.blur();
    }
  });
});
