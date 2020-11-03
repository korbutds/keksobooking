// 'use strict';
'use strict';

const STATUS_CODE = {
  OK: 200
};

const TIMEOUT_IN_MS = 1000;

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
  xhr.open(`POST`, `https://21.javascript.pages.academy/keksobookin`);
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.send(data);
};

window.server = {
  load,
  send
};

// const STATUS_CODE = {
//   OK: 200
// };

// const DATA_URL = {
//   GET: `https://21.javascript.pages.academy/keksobooking/data`,
//   SEND: `https://21.javascript.pages.academy/keksobooking`
// };

// const TIMEOUT_IN_MS = 1000;

// const getServerRequest = (xhr, successLoad, errorLoad, data) => {
//   let successFlag = false;

//   if (data) {
//     successFlag = true;
//   }

//   xhr.responseType = `json`;

//   xhr.addEventListener(`load`, () => {
//     if (xhr.status === STATUS_CODE.OK) {
//       successLoad(xhr.response);
//     } else {
//       errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`, successFlag);
//     }
//   });
//   xhr.timeout = TIMEOUT_IN_MS;

//   xhr.addEventListener(`error`, () => {
//     errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`, successFlag);
//   });
//   xhr.addEventListener(`timeout`, () => {
//     errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`, successFlag);
//   });
// };

// const load = (successLoad, errorLoad) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open(`GET`, DATA_URL.GET);
//   getServerRequest(xhr, successLoad, errorLoad);
//   xhr.send();
// };

// const send = (successLoad, errorLoad, data) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open(`POST`, DATA_URL.SEND);
//   getServerRequest(xhr, successLoad, errorLoad, data);
//   xhr.send(data);
// };

// window.server = {
//   load,
//   send
// };
