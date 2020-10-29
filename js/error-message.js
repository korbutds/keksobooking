'use strict';

const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

window.errorMessage = (errorText, load) => {
  const errorFragment = document.createDocumentFragment();
  const newErrMessage = errorTemplate.cloneNode(true);
  newErrMessage.querySelector(`.error__message`).textContent = errorText;
  errorFragment.appendChild(newErrMessage);
  document.querySelector(`.map__pins`).appendChild(errorFragment);
  const errorButton = newErrMessage.querySelector(`button`);
  const onErrorButtonClick = () => {
    newErrMessage.remove();
    errorButton.removeEventListener(`click`, onErrorButtonClick);
    if (!load) {
      window.server.load(window.data.getServerData, window.errorMessage);
      window.pageActivate.getDeactivePage();
    }
  };
  errorButton.addEventListener(`click`, onErrorButtonClick);
};
