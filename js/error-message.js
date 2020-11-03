'use strict';

const main = document.querySelector(`main`);
const error = document.querySelector(`#error`)
.content
.querySelector(`.error`);

const errorElement = error.cloneNode(true);
const errorMessage = errorElement.querySelector(`.error__message`);
const errorButton = errorElement.querySelector(`.error__button`);

const createErrorPopup = (errorText) => {
  errorMessage.textContent = errorText;
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, errorButtonClickOn);
  document.addEventListener(`click`, errorPopupClickOn);
  document.addEventListener(`keydown`, errorEscPressOn);
};

const removeErrorPopup = () => {
  main.removeChild(errorElement);
  errorButton.removeEventListener(`click`, errorButtonClickOn);
  document.removeEventListener(`click`, errorPopupClickOn);
  document.removeEventListener(`keydown`, errorEscPressOn);
};

const errorButtonClickOn = () => {
  removeErrorPopup();
};

const errorPopupClickOn = () => {
  removeErrorPopup();
};

const errorEscPressOn = (evt) => {
  if (evt.key === `Escape`) {
    removeErrorPopup();
  }
};

const errorUploadOn = (errorText) => {
  return () => {
    createErrorPopup(errorText);
  };
};

window.error = {
  errorUploadOn
};
