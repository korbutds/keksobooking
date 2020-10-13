'use strict';

(() => {
  const load = (successLoad, errorLoad) => {
    const STATUS_CODE = {
      OK: 200
    };
    const TIMEOUT_IN_MS = 10;

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
    loadData: load
  };
})();
