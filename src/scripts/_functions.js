// Здесь будут js-функции
import "./functions/scroll";
import { autoFocus } from "./functions/autofocus";
import "./functions/validate";

document.querySelectorAll(".btn").forEach((btn) => {
  if (btn.textContent === "Зарегистрироваться") {
    btn.addEventListener("click", (e) => {
      autoFocus("firstInput");
    });
  }
});

document.querySelector('[href="#registration"]').addEventListener("click", (e) => {
  autoFocus("firstInput");
});
