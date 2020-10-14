'use strict';

(() => {
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const errorMessage = (errorText, load) => {
    const errorFragment = document.createDocumentFragment();
    const newErrMessage = errorTemplate.cloneNode(true);
    newErrMessage.querySelector(`.error__message`).textContent = errorText;
    errorFragment.appendChild(newErrMessage);
    window.data.mapSection.appendChild(errorFragment);
    const errorButton = newErrMessage.querySelector(`button`);
    const onErrorButtonClick = () => {
      newErrMessage.remove();
      errorButton.removeEventListener(`click`, onErrorButtonClick);
      if (!load) {
        window.server.getServerRequest(window.data.loadData, window.data.getServerData, window.server.getErrorMessage);
        window.pageActivate.getDeactivePage();
      }
    };
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = () => {
    const successFragment = document.createDocumentFragment();
    const newSuccessMessage = successTemplate.cloneNode(true);
    successFragment.appendChild(newSuccessMessage);
    document.querySelector(`main`).appendChild(successFragment);
    window.pageActivate.getDeactivePage();
    window.data.adForm.reset();
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

  // const getServerResponse = (successLoad, errorLoad, method ,url, data) => {
  //   const STATUS_CODE = {
  //     OK: 200
  //   };

  //   const TIMEOUT_IN_MS = 1000;
  //   let load = false;

  //   console.log(load);
  //   if (method === `GET`) {
  //     load = true;
  //   }

  //   const xhr = new XMLHttpRequest();

  //   xhr.responseType = `json`;
  //   xhr.open(method, url);

  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === STATUS_CODE.OK) {
  //       if (load === false) {
  //         successLoad()
  //       } else {
  //         successLoad(xhr.response);
  //       }
  //     } else {
  //       errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
  //     }
  //   });
  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.addEventListener(`error`, () => {
  //     errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`, load);
  //   });
  //   xhr.addEventListener(`timeout`, () => {
  //     errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`, load);
  //   });
  //   xhr.send(data);
  // };

  const serverRequest = (requestData, successLoad, errorLoad, data) => {
    const STATUS_CODE = {
      OK: 200
    };

    const TIMEOUT_IN_MS = 1000;
    let successFlag = false;

    if (requestData.type === `POST`) {
      successFlag = true;
    }

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.open(requestData.type, requestData.URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE.OK) {
        successLoad(xhr.response);
      } else {
        errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`, successFlag);
      }
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`error`, () => {
      errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`, successFlag);
    });
    xhr.addEventListener(`timeout`, () => {
      errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`, successFlag);
    });
    xhr.send(data);
  };

  // const load = (successLoad, errorLoad, data) => {

  //   const STATUS_CODE = {
  //     OK: 200
  //   };
  //   const TIMEOUT_IN_MS = 1000;

  //   const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  //   const xhr = new XMLHttpRequest();

  //   xhr.responseType = `json`;
  //   xhr.open(`GET`, URL);

  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === STATUS_CODE.OK) {
  //       successLoad(xhr.response);
  //     } else {
  //       errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
  //     }
  //   });
  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.addEventListener(`error`, () => {
  //     errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`);
  //   });
  //   xhr.addEventListener(`timeout`, () => {
  //     errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  //   });
  //   xhr.send();
  // };

  // const save = (successLoad, errorLoad, data) => {
  //   // getServerResponse(successLoad, errorLoad, `POST`, `https://21.javascript.pages.academy/keksobooking`, data);
  //   const STATUS_CODE = {
  //     OK: 200
  //   };
  //   const TIMEOUT_IN_MS = 1000;

  //   const URL = `https://21.javascript.pages.academy/keksobooking`;
  //   const xhr = new XMLHttpRequest();

  //   xhr.responseType = `json`;
  //   xhr.open(`POST`, URL);

  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === STATUS_CODE.OK) {
  //       successLoad(xhr.response);

  //     } else {
  //       errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`, `true`);
  //     }
  //   });
  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.addEventListener(`error`, () => {
  //     errorLoad(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`, `true`);
  //   });
  //   xhr.addEventListener(`timeout`, () => {
  //     errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`, `true`);
  //   });
  //   xhr.send(data);
  // };

  window.server = {
    // loadData: load,
    // saveData: save,
    getErrorMessage: errorMessage,
    getSuccessMessage: successMessage,
    getServerRequest: serverRequest
  };
})();
