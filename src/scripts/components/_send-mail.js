// Send mail
const form = document.querySelector(".form-registration");
const sendMessage = document.querySelector(".modal-send");
const inputs = document.querySelectorAll(".form-registration__input");

function sendMail() {
  let formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      postDb(formData);
      sendMessage.classList.remove("is-hidden");
      setTimeout(() => sendMessage.classList.add("is-hidden"), 2000);
    }
  };
  xhr.open("POST", "../mail.php", true);
  xhr.send(formData);
  form.reset();
}

function postDb(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../db.php", true);
  xhr.send(formData);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let validatesArray = [];

    inputs.forEach((input, i) => {
      if (input.style.borderColor === "green") {
        validatesArray[i] = true;
      }
    });
    if (validatesArray.length === 4) {
      sendMail();
      inputs.forEach((input) => {
        input.style.borderColor = "black";
      });
    }
  });
}
