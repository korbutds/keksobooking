'use strict';

(() => {
  const load = (successLoad) => {
    // const STATUS_CODE = {
    //   OK: 200
    // };
    // const TIMEOUT_IN_MS = 10000;

    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        successLoad(xhr.response);
      } else {
        console.log(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
      // if (xhr.status === STATUS_CODE.OK) {
      // } else {
      //   errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      // }
      // xhr.addEventListener(`error`, () => {
      //   errorLoad(`Произошла ошибка соеденения`);
      // });
      // xhr.addEventListener(`timeout`, () => {
      //   errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });
    // xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  window.server = {
    loadData: load
  };
})();
