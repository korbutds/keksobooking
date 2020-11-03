'use strict';

const main = document.querySelector(`main`);
const successTemplate = document.querySelector(`#success`)
.content
.querySelector(`.success`);

const KeyboardButtons = {
  ESCAPE: `Escape`
};

const newSuccessMessage = successTemplate.cloneNode(true);

window.createSuccessMessage = () => {
  main.appendChild(newSuccessMessage);
  window.pageActivate.getDeactivePage();
  document.querySelector(`.ad-form`).reset();
  document.addEventListener(`click`, onSuccessMessageClick);
  document.addEventListener(`keydown`, onSuccessMessageEscape);
};

const removeSuccessMessage = () => {
  newSuccessMessage.remove();
  document.removeEventListener(`click`, onSuccessMessageClick);
  document.removeEventListener(`keydown`, onSuccessMessageEscape);
};

const onSuccessMessageClick = (evt) => {
  if (evt.button === 0) {
    removeSuccessMessage();
  }
};
const onSuccessMessageEscape = (evt) => {
  if (evt.code === KeyboardButtons.ESCAPE) {
    removeSuccessMessage();
  }
};

