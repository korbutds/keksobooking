'use strict';

const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

window.errorMessage = (errorText) => {
  const errorFragment = document.createDocumentFragment();
  const newErrMessage = errorTemplate.cloneNode(true);
  newErrMessage.querySelector(`.error__message`).textContent = errorText;
  errorFragment.appendChild(newErrMessage);
  document.querySelector(`.map__pins`).appendChild(errorFragment);
  const errorButton = newErrMessage.querySelector(`.error__button`);

  const onErrorButtonClick = () => {
    newErrMessage.remove();
    errorButton.removeEventListener(`click`, onErrorButtonClick);
    window.pageActivate.getDeactivePage();
  };

  const outOfErrorMessage = () => {
    return (evt) => {
      if (evt.code === `Escape` || evt.button === 0) {
        window.pageActivate.getDeactivePage();
        newErrMessage.remove();
        document.removeEventListener(`mousedown`, outOfErrorMessage());
        document.removeEventListener(`keydown`, outOfErrorMessage());
      }
    };
  };
  errorButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`keydown`, outOfErrorMessage());
  document.addEventListener(`mousedown`, outOfErrorMessage());
};
