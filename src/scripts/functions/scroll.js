window.addEventListener("scroll", () => {
  document.querySelectorAll(".section").forEach((el, i) => {
    if (window.scrollY + document.querySelector(".header").clientHeight + 300 >= el.offsetTop) {
      document.querySelectorAll(".nav-link").forEach((el) => {
        el.classList.remove("nav-link--active");
      });
      document.querySelectorAll(".nav-item")[i].querySelector("a").classList.add("nav-link--active");
    }

    if (window.scrollY + document.querySelector(".header").clientHeight >= el.offsetTop + el.clientHeight) {
      document.querySelectorAll(".nav-link").forEach((el) => {
        el.classList.remove("nav-link--active");
      });
    }
  });

  if (
    window.scrollY + document.querySelector(".header").clientHeight <
    document.querySelectorAll(".section")[0].offsetTop
  ) {
    if (document.querySelector(".nav-link--active")) {
      document.querySelector(".nav-link--active").classList.remove("nav-link--active");
    }
  }
});
