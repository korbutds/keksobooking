'use strict';

const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
window.successMessage = () => {
  const successFragment = document.createDocumentFragment();
  const newSuccessMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(newSuccessMessage);
  document.querySelector(`main`).appendChild(successFragment);
  window.pageActivate.getDeactivePage();
  document.querySelector(`.ad-form`).reset();
  const outOfSuccessMessage = () => {
    return (evt) => {
      if (evt.code === `Escape` || evt.button === 0) {
        newSuccessMessage.remove();
        document.removeEventListener(`click`, outOfSuccessMessage());
        document.removeEventListener(`keydown`, outOfSuccessMessage());
      }
    };
  };
  document.addEventListener(`click`, outOfSuccessMessage());
  document.addEventListener(`keydown`, outOfSuccessMessage());
};

