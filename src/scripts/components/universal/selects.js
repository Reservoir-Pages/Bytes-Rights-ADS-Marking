import Choices from "choices.js";

// Custom select - One
const choices = new Choices(document.querySelector('.select-region'), {
  searchEnabled: false,
  itemSelectText: '',
  position: 'bottom',
  shouldSort: false,
});
// Custom select - Many
const choicesOptions = document.querySelectorAll('.select-options');
choicesOptions.forEach(choice => {
  const choices = new Choices(choice, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    shouldSort: false,
  });
});
