document.querySelectorAll(".ads-presenters__btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const path = btn.getAttribute("data-path");
    const modals = document.querySelectorAll(".modal");

    modals.forEach((modal) => {
      if (modal.getAttribute("data-target") === path) {
        document.body.style.overflow = "hidden";
        modal.classList.remove("is-hidden");
        modal.querySelector(".modal__close").focus();

        const modalOverlay = modal.querySelector(".modal__overlay");

        modalOverlay.addEventListener("click", (e) => {
          if (e.target === modalOverlay) {
            modal.classList.add("is-hidden");
            document.body.style.overflow = "";
          }
        });
      }
    });
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.querySelector(".modal__close").addEventListener("click", () => {
    modal.classList.add("is-hidden");
    document.body.style.overflow = "";
  });
});
