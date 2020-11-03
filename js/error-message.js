'use strict';

const main = document.querySelector(`main`);
const error = document.querySelector(`#error`)
.content
.querySelector(`.error`);

const KeyboardButtons = {
  ESCAPE: `Escape`
};

const errorElement = error.cloneNode(true);
const errorMessage = errorElement.querySelector(`.error__message`);
const errorButton = errorElement.querySelector(`.error__button`);

const createErrorPopup = (errorText) => {
  errorMessage.textContent = errorText;
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`click`, onErrorPopupClick);
  document.addEventListener(`keydown`, onErrorEscPress);
};

const removeErrorPopup = () => {
  main.removeChild(errorElement);
  errorButton.removeEventListener(`click`, onErrorButtonClick);
  document.removeEventListener(`click`, onErrorPopupClick);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorButtonClick = () => {
  removeErrorPopup();
};

const onErrorPopupClick = () => {
  removeErrorPopup();
};

const onErrorEscPress = (evt) => {
  if (evt.key === KeyboardButtons.ESCAPE) {
    removeErrorPopup();
  }
};

const uploadErrorMessage = (errorText) => {
  return () => {
    createErrorPopup(errorText);
  };
};

window.error = {
  uploadErrorMessage
};
