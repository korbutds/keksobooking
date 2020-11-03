// 'use strict';
'use strict';

const STATUS_CODE = {
  OK: 200
};

const TIMEOUT_IN_MS = 2000;

const getServerRequest = (xhr, successLoad, errorLoad) => {

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE.OK) {
      successLoad(xhr.response);
    } else {
      errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`error`, () => {
    errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`);
  });
  xhr.addEventListener(`timeout`, () => {
    errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });
};

const load = (successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.send();
};

const send = (data, successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.send(data);
};

window.server = {
  load,
  send
};
