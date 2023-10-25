// Header buttons
const menuBtns = document.querySelectorAll('.catalog__btn');
const drops = document.querySelectorAll('.catalog__list');
menuBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const currentBtn = e.currentTarget;
    const drop = currentBtn.closest('.catalog').querySelector('.catalog__list');
    menuBtns.forEach(btn => {
      if (btn !== currentBtn) {
        btn.classList.remove('catalog__btn--active');
      };
    });

    drops.forEach(el => {
      if (el !== drop) {
        el.classList.remove('catalog__list--active');
      };
    });

    drop.classList.toggle('catalog__list--active');
    currentBtn.classList.toggle('catalog__btn--active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.catalog')) {
      menuBtns.forEach(btn => {
        btn.classList.remove('catalog__btn--active');
      });

      drops.forEach(el => {
        el.classList.remove('catalog__list--active');
      });
    };
  });
});
const productLists = document.querySelectorAll('.product-info__list');
productLists.forEach(list => {
  const moreBtn = list.querySelector('.product-info__more-btn');
  const hiddenItem = list.querySelectorAll('.d-none');

  if (moreBtn) {
      moreBtn.addEventListener('click', (e) => {
      const currentBtn = e.target;
      currentBtn.classList.add('d-none');

      hiddenItem.forEach(item => {
        item.classList.remove('d-none');
      });
    });
  };
});
