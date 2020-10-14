'use strict';

(() => {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const errorMessage = (errorText) => {
    const errorFragment = document.createDocumentFragment();
    const newErrMessage = errorTemplate.cloneNode(true);
    newErrMessage.querySelector(`.error__message`).textContent = errorText;
    errorFragment.appendChild(newErrMessage);
    window.data.mapSection.appendChild(errorFragment);
    window.pageActivate.getDeactivePage();
    const errorButton = newErrMessage.querySelector(`button`);
    const onErrorButtonClick = () => {
      newErrMessage.remove();
      window.server.loadData(window.data.getServerData, window.server.getErrorMessage);
      errorButton.removeEventListener(`click`, onErrorButtonClick);
    };
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const load = (successLoad, errorLoad) => {
    const STATUS_CODE = {
      OK: 200
    };
    const TIMEOUT_IN_MS = 100;

    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE.OK) {
        successLoad(xhr.response);
      } else {
        errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      errorLoad(`Произошла ошибка соеденения`);
    });
    xhr.addEventListener(`timeout`, () => {
      errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  window.server = {
    loadData: load,
    getErrorMessage: errorMessage
  };
})();
