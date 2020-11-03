'use strict';

const main = document.querySelector(`main`);
const error = document.querySelector(`#error`)
.content
.querySelector(`.error`);

const errorElement = error.cloneNode(true);
const errorMessage = errorElement.querySelector(`.error__message`);
const errorButton = errorElement.querySelector(`.error__button`);

const createErrorPopup = (errorText) => {
  errorMessage.textContent = errorText;
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, errorButtonClickOn);
  document.addEventListener(`click`, errorPopupClickOn);
  document.addEventListener(`keydown`, errorEscPressOn);
};

const removeErrorPopup = () => {
  main.removeChild(errorElement);
  // window.pageActivate.getDeactivePage();
  errorButton.removeEventListener(`click`, errorButtonClickOn);
  document.removeEventListener(`click`, errorPopupClickOn);
  document.removeEventListener(`keydown`, errorEscPressOn);
};

const errorButtonClickOn = () => {
  removeErrorPopup();
};

const errorPopupClickOn = () => {
  removeErrorPopup();
};

const errorEscPressOn = (evt) => {
  if (evt.key === `Escape`) {
    removeErrorPopup();
  }
};

const errorUploadOn = (errorText) => {
  createErrorPopup(errorText);
};

window.error = {
  errorUploadOn
};


// const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

// window.errorMessage = (errorText, flag) => {
//   const errorFragment = document.createDocumentFragment();
//   const newErrMessage = errorTemplate.cloneNode(true);
//   newErrMessage.querySelector(`.error__message`).textContent = errorText;
//   errorFragment.appendChild(newErrMessage);
//   document.querySelector(`.map__pins`).appendChild(errorFragment);
//   const errorButton = newErrMessage.querySelector(`.error__button`);

//   const onErrorButtonClick = () => {
//     newErrMessage.remove();
//     errorButton.removeEventListener(`click`, onErrorButtonClick);
//     if (!flag) {
//       window.pageActivate.getDeactivePage();
//     }
//   };

//   const outOfErrorMessage = () => {
//     return (evt) => {
//       if (evt.code === `Escape` || evt.button === 0) {
//         onErrorButtonClick();

//         document.removeEventListener(`mousedown`, outOfErrorMessage());
//         document.removeEventListener(`keydown`, outOfErrorMessage());
//       }
//     };
//   };
//   errorButton.addEventListener(`click`, onErrorButtonClick);
//   document.addEventListener(`keydown`, outOfErrorMessage());
//   document.addEventListener(`mousedown`, outOfErrorMessage());
// };
