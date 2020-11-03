'use strict';

const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
window.successMessage = () => {
  const successFragment = document.createDocumentFragment();
  const newSuccessMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(newSuccessMessage);
  document.querySelector(`main`).appendChild(successFragment);
  window.pageActivate.getDeactivePage();
  document.querySelector(`.ad-form`).reset();
  const onSuccessMessageClick = (evt) => {
    if (evt.button === 0) {
      newSuccessMessage.remove();
      document.removeEventListener(`click`, onSuccessMessageClick);
    }
  };
  const onSuccessMessageEscape = (evt) => {
    if (evt.code === `Escape`) {
      newSuccessMessage.remove();
      document.removeEventListener(`keydown`, onSuccessMessageEscape);
    }
  };
  document.addEventListener(`click`, onSuccessMessageClick);
  document.addEventListener(`keydown`, onSuccessMessageEscape);
};

