import Swiper from "swiper/bundle";

const trendsSwiper = new Swiper(".ads-reviews-swiper", {
  slidesPerView: 2,
  spaceBetween: 130,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
