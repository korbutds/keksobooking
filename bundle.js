/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const disabledElements = (disabledArray) => {
  for (const element of disabledArray) {
    element.disabled = true;
  }
};

const unDisabledElements = (undisabledArray) => {
  for (const element of undisabledArray) {
    element.disabled = false;
  }
};

window.util = {
  getRandomIntInclusive: getRandomNumber,
  getRandomArrayElement: getRandomElement,
  getDisabledElements: disabledElements,
  getUnDisabledElements: unDisabledElements
};

})();

(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const STATUS_CODE = {
  OK: 200
};

const TIMEOUT_IN_MS = 2000;

const getServerRequest = (xhr, successLoad, errorLoad, data = false) => {
  let successFlag = false;

  if (data !== false) {
    successFlag = true;
  }

  xhr.responseType = `json`;

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

const load = (successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
  getServerRequest(xhr, successLoad, errorLoad);
};

const send = (successLoad, errorLoad, data) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
  getServerRequest(xhr, successLoad, errorLoad, data);
};

window.server = {
  load,
  send
};

})();

(() => {
/*!*****************************!*\
  !*** ./js/error-message.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!*******************************!*\
  !*** ./js/success-message.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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


})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.data = {};

// window.data.orderMap = document.querySelector(`.map`);
// window.data.noticeSection = document.querySelector(`.notice`);
// window.data.mapPins = window.data.orderMap.querySelector(`.map__pins`);
// window.data.MAP_WIDTH = window.data.orderMap.offsetWidth;
// window.data.adForm = window.data.noticeSection.querySelector(`.ad-form`);
// window.data.adFormReset = window.data.adForm.querySelector(`.ad-form__reset`);
// window.data.adFormFieldsets = window.data.adForm.querySelectorAll(`.ad-form > fieldset`);
// window.data.adFormSubmit = window.data.adForm.querySelector(`.ad-form__submit`);
// window.data.mapFiltersContainer = window.data.orderMap.querySelector(`.map__filters-container`);
// window.data.mapFilters = window.data.mapFiltersContainer.querySelector(`.map__filters`);
// window.data.mapFiltersElements = window.data.mapFilters.children;
// window.data.mapPinMain = window.data.mapPins.querySelector(`.map__pin--main`);
// window.data.mapPinMainCoords = {
//   left: `570px`,
//   top: `375px`
// };
// window.data.PIC_TYPES = [`jpg`, `jpeg`, `png`];
// window.data.avatarLoad = document.querySelector(`#avatar`);
// window.data.avatorPreview = document.querySelector(`.ad-form-header__preview`);

// window.data.adPicLoad = document.querySelector(`#images`);
// window.data.adPicPreview = document.querySelector(`.ad-form__photo`);
// window.data.PIN_WIDTH = window.data.mapPinMain.offsetWidth;
// window.data.PIN_HEIGHT = window.data.mapPinMain.offsetHeight;
// window.data.PIN_TAIL_HEIGHT = 22;
// window.data.adAvatar = window.data.adForm.querySelector(`#avatar`);
// window.data.adTitle = window.data.adForm.querySelector(`#title`);
// window.data.guestsSelect = window.data.adForm.querySelector(`#capacity`);
// window.data.roomsSelect = window.data.adForm.querySelector(`#room_number`);
// window.data.roomTypeSelect = window.data.adForm.querySelector(`#type`);
// window.data.timeInSelect = window.data.adForm.querySelector(`#timein`);
// window.data.timeOutSelect = window.data.adForm.querySelector(`#timeout`);
// window.data.addressInput = window.data.adForm.querySelector(`#address`);
// window.data.priceInput = window.data.adForm.querySelector(`#price`);
// window.data.description = window.data.adForm.querySelector(`#description`);
// window.data.adPhoto = window.data.adForm.querySelector(`#images`);
// window.data.featuresCheckboxes = window.data.adForm.querySelectorAll(`.feature__checkbox`);
// window.data.mainPinXY = `X: ${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, Y: ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT / 2)}`;
// window.data.PIN_NUMBERS = 8;
// window.data.titles = [
//   `Милая, уютная квартирка в центре Токио`,
//   `Уютное гнездышко для молодоженов`,
//   `Идеальный вариант для фотосессии`,
//   `Недорогое жилье для студентов`,
//   `Жилье в стиле Лофт`,
//   `Все что нужно программисту`,
//   `Лучше 18 квадратов в этом районе`,
//   `Сдам на ночь. Можно и на часы`
// ];
// window.data.types = [
//   `palace`,
//   `flat`,
//   `house`,
//   `bungalow`
// ];
// window.data.checkTimes = [`12:00`, `13:00`, `14:00`];
// window.data.features = [
//   `wifi`,
//   `dishwasher`,
//   `parking`,
//   `washer`,
//   `elevator`,
//   `conditioner`
// ];
// window.data.photos = [
//   `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
//   `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
//   `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
// ];
// window.data.loadData = {
//   URL: `https://21.javascript.pages.academy/keksobooking/data`,
//   type: `GET`
// };
// window.data.saveData = {
//   URL: `https://21.javascript.pages.academy/keksobooking`,
//   type: `POST`
// };
// window.data.mapSection = document.querySelector(`.map__pins`);
window.data.getServerData = (pins) => {
  window.data.serverData = pins.slice();
};
window.server.load(window.data.getServerData, window.errorMessage);
// window.data.KEKS_PIN_FRINGE = {
//   top: 130 - window.data.PIN_TAIL_HEIGHT - window.data.PIN_HEIGHT,
//   left: 0 - window.data.PIN_WIDTH / 2,
//   right: window.data.MAP_WIDTH - window.data.PIN_WIDTH / 2,
//   bottom: 630 - window.data.PIN_TAIL_HEIGHT - window.data.PIN_HEIGHT
// };


})();

(() => {
/*!*****************************!*\
  !*** ./js/page-activate.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const orderMap = document.querySelector(`.map`);
const noticeSection = document.querySelector(`.notice`);
const mapPins = orderMap.querySelector(`.map__pins`);
const adForm = noticeSection.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`.ad-form > fieldset`);
const mapFiltersContainer = orderMap.querySelector(`.map__filters-container`);
const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
const mapFiltersElements = mapFilters.children;
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const mapPinMainCoords = {
  left: `570px`,
  top: `375px`
};
const avatarLoad = document.querySelector(`#avatar`);
const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicLoad = document.querySelector(`#images`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const addressInput = adForm.querySelector(`#address`);


const setActivePage = () => {
  return (evt) => {
    if (orderMap.classList.contains(`map--faded`) && (evt.button === 0 || evt.code === `Enter`)) {
      window.util.getUnDisabledElements(adFormFieldsets);
      window.util.getUnDisabledElements(mapFiltersElements);
      orderMap.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, Y: ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
      addressInput.readOnly = true;
      window.map.getPinMap(window.data.serverData);
      avatarLoad.addEventListener(`change`, window.previewCb);
      adPicLoad.addEventListener(`change`, window.previewCb);
    }
  };
};

const setDeactivePage = () => {
  window.util.getDisabledElements(adFormFieldsets);
  window.util.getDisabledElements(mapFiltersElements);
  orderMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapPinMain.style.top = mapPinMainCoords.top;
  mapPinMain.style.left = mapPinMainCoords.left;
  addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;
  window.pin.getRemovePins();
  avatarLoad.removeEventListener(`change`, window.previewCb);
  adPicLoad.removeEventListener(`change`, window.previewCb);
  window.filter.getFilterReset();
  avatorPreview.querySelector(`img`).src = `img/muffin-grey.svg`;
  adPicPreview.replaceChildren();
};

window.pageActivate = {
  getActivePage: setActivePage,
  getDeactivePage: setDeactivePage
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const PIN_NUMBER = 5;
// const createAdsArray = (count) => {
//   const ads = [];
//   for (let i = 0; i < count; i++) {
//     const ad = {
//       author: {
//         avatar: `img/avatars/user0${i + 1}.png`
//       },
//       offer: {
//         title: titles[i],
//         address: `${window.util.getRandomIntInclusive(0, 1000)}, ${window.util.getRandomIntInclusive(0, 1000)}`,
//         price: `${window.util.getRandomIntInclusive(1, 10) * 100}`,
//         type: window.util.getRandomArrayElement(types),
//         rooms: window.util.getRandomIntInclusive(1, 4),
//         guests: window.util.getRandomIntInclusive(1, 10),
//         checkin: window.util.getRandomArrayElement(checkTimes),
//         checkout: window.util.getRandomArrayElement(checkTimes),
//         features: features.slice(0, window.util.getRandomIntInclusive(1, features.length - 1)),
//         description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
//         photos: photos.slice(window.util.getRandomIntInclusive(0, photos.length - 1))
//       },
//       location: {
//         x: window.util.getRandomIntInclusive(PIN_WIDTH, MAP_WIDTH),
//         y: window.util.getRandomIntInclusive(130, 630)
//       }
//     };
//     ads.push(ad);
//   }
//   return ads;
// };

const orderMap = document.querySelector(`.map`);
const mapPins = orderMap.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const mapSection = document.querySelector(`.map__pins`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPinFragment = (pins) => {
  const pinFragment = document.createDocumentFragment();
  let pinsCount;
  if (pins.length > PIN_NUMBER) {
    pinsCount = PIN_NUMBER;
  } else {
    pinsCount = pins.length;
  }
  for (let i = 0; i < pinsCount; i++) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImage = newPin.querySelector(`img`);
    newPin.style.cssText = `left: ${pins[i].location.x - PIN_WIDTH}px; top: ${pins[i].location.y}px;`;
    pinImage.src = pins[i].author.avatar;
    pinImage.alt = pins[i].offer.title;
    pinFragment.appendChild(newPin);
  }

  return pinFragment;
};

const createPinsMap = (pins) => {
  const mockPins = createPinFragment(pins);
  mapSection.appendChild(mockPins);
  const pinsList = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  let pinsCount;
  if (pins.length > PIN_NUMBER) {
    pinsCount = PIN_NUMBER;
  } else {
    pinsCount = pins.length;
  }

  for (let i = 0; i < pinsCount; i++) {
    window.pin.onAdCardClick(pinsList[i], pins[i]);
  }
};

window.map = {
  getPinFragment: createPinFragment,
  getPinMap: createPinsMap
};

})();

(() => {
/*!*****************************!*\
  !*** ./js/drag-and-drop.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const letTransformElement = (element, limits, modal = element) => {
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`#address`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapPinMain = mapPins.querySelector(`.map__pin--main`);
  const PIN_WIDTH = mapPinMain.offsetWidth;
  const PIN_HEIGHT = mapPinMain.offsetHeight;
  const PIN_TAIL_HEIGHT = 22;


  element.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let moveFlag = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      moveFlag = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      modal.style.top = `${modal.offsetTop - shift.y}px`;
      modal.style.left = `${modal.offsetLeft - shift.x}px`;

      if (modal.offsetTop < limits.top) {
        modal.style.top = `${limits.top}px`;
      } else if (modal.offsetTop > limits.bottom) {
        modal.style.top = `${limits.bottom}px`;
      } else if (modal.offsetLeft < limits.left) {
        modal.style.left = `${limits.left}px`;
      } else if (modal.offsetLeft > limits.right) {
        modal.style.left = `${limits.right}px`;
      }

      addressInput.value = `Х: ${Math.round(modal.offsetLeft + PIN_WIDTH / 2)}, Y: ${Math.round(modal.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (moveFlag) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          element.removeEventListener(`click`, onClickPreventDefault);
        };
        element.addEventListener(`click`, onClickPreventDefault);
      }
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

window.dragAndDrop = {
  getTransformElement: letTransformElement
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`.ad-form > fieldset`);
const addressInput = adForm.querySelector(`#address`);
const adAvatar = adForm.querySelector(`#avatar`);
const adTitle = adForm.querySelector(`#title`);
const guestsSelect = adForm.querySelector(`#capacity`);
const roomsSelect = adForm.querySelector(`#room_number`);
const roomTypeSelect = adForm.querySelector(`#type`);
const timeInSelect = adForm.querySelector(`#timein`);
const timeOutSelect = adForm.querySelector(`#timeout`);
const priceInput = adForm.querySelector(`#price`);
const description = adForm.querySelector(`#description`);
const adPhoto = adForm.querySelector(`#images`);
const featuresCheckboxes = adForm.querySelectorAll(`.feature__checkbox`);

const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersElements = mapFilters.children;
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;

window.util.getDisabledElements(adFormFieldsets);
window.util.getDisabledElements(mapFiltersElements);

addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, Y: ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;

const changeRoomTypeValue = (value) => {
  let roomPrice = 0;
  switch (value) {
    case `bungalow`:
      roomPrice = 0;
      break;
    case `flat`:
      roomPrice = 1000;
      break;
    case `house`:
      roomPrice = 5000;
      break;
    case `palace`:
      roomPrice = 10000;
      break;
  }
  priceInput.min = roomPrice;
  priceInput.placeholder = roomPrice;
};

const changeTimeOutValue = (value) => {
  timeOutSelect.value = value;
};

const changeTimeInValue = (value) => {
  timeInSelect.value = value;
};

changeRoomTypeValue(roomTypeSelect.value);

roomTypeSelect.addEventListener(`change`, (evt) => {
  changeRoomTypeValue(evt.target.value);
});


changeTimeOutValue(timeInSelect.value);

timeInSelect.addEventListener(`change`, (evt) => {
  changeTimeOutValue(evt.target.value);
});

timeOutSelect.addEventListener(`change`, (evt) =>{
  changeTimeInValue(evt.target.value);
});

const roomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const changeRoomNumberValue = (value) => {
  [...guestsSelect.options].forEach((option) => {
    option.disabled = !roomsForGuests[value].includes(option.value);
  });
  guestsSelect.value = value > 3 ? `0` : value;
};

changeRoomNumberValue(roomsSelect.value);

roomsSelect.addEventListener(`change`, (evt) => {
  changeRoomNumberValue(evt.target.value);
});

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.server.send(window.successMessage, window.errorMessage, new FormData(adForm));
});


adForm.addEventListener(`reset`, (evt) => {
  evt.preventDefault();
  changeRoomNumberValue(roomsSelect.value);
  window.pageActivate.getDeactivePage();
  window.form.getResetForm();

});

const standartValue = {
  title: ``,
  roomTypeValue: `flat`,
  roomPrice: 1000,
  numberOfRooms: 1,
  timeInSelect: `12:00`,
  guestsValue: 1
};

const resetForm = () => {
  adTitle.value = ``;
  roomTypeSelect.value = standartValue.roomTypeValue;
  roomsSelect.value = standartValue.numberOfRooms;
  priceInput.value = ``;
  priceInput.placeholder = standartValue.roomPrice;
  description.value = ``;
  timeInSelect.value = standartValue.timeInSelect;
  timeOutSelect.value = timeInSelect.value;
  guestsSelect.value = standartValue.guestsValue;
  adPhoto.value = ``;
  adAvatar.value = ``;
  window.pin.getRemovePopup();

  [...featuresCheckboxes].forEach((checkbox) => {
    checkbox.checked = false;
  });
};

window.form = {
  getResetForm: resetForm
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const createFeatureItem = (card, featuresArray) => {
  const popupFeature = card.querySelector(`.popup__features`);
  const featuresList = document.createDocumentFragment();
  for (let i = 0; i < featuresArray.length; i++) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--${featuresArray[i]}`);
    featuresList.appendChild(element);
  }
  popupFeature.innerHTML = ``;
  popupFeature.appendChild(featuresList);
};

const createAdPhotos = (card, photoArray) => {
  const popupPhotos = card.querySelector(`.popup__photos`);
  const emptyImg = popupPhotos.querySelector(`img`).cloneNode(true);
  popupPhotos.innerHTML = ``;

  for (let j = 0; j < photoArray.length; j++) {
    const newPhoto = emptyImg.cloneNode(true);
    newPhoto.src = photoArray[j];
    popupPhotos.appendChild(newPhoto);
  }
};

const createAdCard = (ad) => {
  const cardFragment = document.createDocumentFragment();
  const newCard = cardPopupTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = ad.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = ad.offer.type;
  newCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнат для ${ad.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}`;
  newCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
  createFeatureItem(newCard, ad.offer.features);
  createAdPhotos(newCard, ad.offer.photos);
  cardFragment.appendChild(newCard);

  return cardFragment;
};


window.card = {
  getAdCard: createAdCard
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const orderMap = document.querySelector(`.map`);
const mapPins = orderMap.querySelector(`.map__pins`);
const mapFiltersContainer = orderMap.querySelector(`.map__filters-container`);

const activatePin = (pin) => {
  pin.classList.add(`map__pin--active`);
};

const unactivatePin = () => {
  const mapPin = mapPins.querySelectorAll(`.map__pin`);
  mapPin.forEach((pin) => {
    pin.classList.remove(`map__pin--active`);
  });
};

const removeCardPopup = () => {
  if (orderMap.querySelector(`.map__card.popup`)) {
    orderMap.querySelector(`.map__card.popup`).remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    removeCardPopup(orderMap.querySelector(`.map__card.popup`));
    unactivatePin();
  }
};

const onCardElementClick = (pinButton, pinCard) => {
  pinButton.addEventListener(`click`, () => {
    const mapCardPoput = orderMap.querySelector(`.map__card.popup`);
    if (mapCardPoput) {
      unactivatePin();
      removeCardPopup();
      activatePin(pinButton);
    } else {
      activatePin(pinButton);
    }
    orderMap.insertBefore(window.card.getAdCard(pinCard), mapFiltersContainer);
    document.addEventListener(`keydown`, onPopupEscPress);
    const closeMapPopup = orderMap.querySelector(`.popup__close`);
    closeMapPopup.addEventListener(`click`, () => {
      removeCardPopup();
      unactivatePin();
    });
  });
};

const removePins = () => {
  const pinsList = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pinsList.forEach((element) => {
    element.remove();
  });
};

window.pin = {
  onAdCardClick: onCardElementClick,
  getRemovePopup: removeCardPopup,
  getUnactivatePin: unactivatePin,
  getRemovePins: removePins
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 300; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const mapFilters = document.querySelector(`.map__filters`);
const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
const housingFeaturesList = mapFilters.querySelectorAll(`.map__checkbox`);
const filterFunc = () => {
  let pins = window.data.serverData.slice();
  window.pin.getRemovePopup();
  window.pin.getRemovePins();

  housingFeaturesList.forEach((element) => {
    if (element.checked) {
      const checkedElementFeature = element.id.replace(/filter-/gi, ``);
      pins = pins.filter((pin) => {
        return pin.offer.features.includes(checkedElementFeature);
      });
    }
  });

  const filterPinsByType = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.type === value;
    });
  };

  const filterPinsByPrice = (value) => {
    pins = pins.filter((pin) => {
      switch (value) {
        case `middle`:
          return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
        case `low`:
          return pin.offer.price < 10000;
        case `high`:
          return pin.offer.price > 50000;
        default:
          return false;
      }
    });
  };

  const filterPinsByRooms = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.price === Number(value);
    });
  };

  const filterPinsByGuests = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.price === Number(value);
    });
  };

  const Filter = [
    {
      name: housingTypeFilter,
      filterFunction: filterPinsByType
    },
    {
      name: housingPriceFilter,
      filterFunction: filterPinsByPrice
    },
    {
      name: housingRoomsFilter,
      filterFunction: filterPinsByRooms
    },
    {
      name: housingGuestsFilter,
      filterFunction: filterPinsByGuests
    },
  ];

  Filter.forEach((obj) => {
    const selectValue = obj.name.value;
    if (selectValue !== `any`) {
      obj.filterFunction(selectValue);
    }
  });

  window.map.getPinMap(pins);
};

mapFilters.addEventListener(`change`, window.debounce(filterFunc));

const filterReset = () => {
  mapFilters.querySelectorAll(`select`).forEach((select) => {
    select.value = `any`;
  });
  housingFeaturesList.forEach((element) => {
    element.checked = false;
  });
};

window.filter = {
  getFilterReset: filterReset
};

})();

(() => {
/*!**********************!*\
  !*** ./js/loader.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIC_TYPES = [`jpg`, `jpeg`, `png`];

const previewDict = {
  'avatar': avatorPreview,
  'images': adPicPreview
};

window.previewCb = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PIC_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();
    reader.addEventListener(`load`, () => {
      previewDict[evt.target.id].replaceChildren();
      previewDict[evt.target.id].style.display = `flex`;
      previewDict[evt.target.id].style.justifyContent = `center`;
      const img = document.createElement(`img`);
      img.src = reader.result;
      img.alt = `Превью добавленного изображеия`;
      img.style.width = `40px`;
      img.style.height = `44px`;
      img.style.alignSelf = `center`;
      previewDict[evt.target.id].appendChild(img);
    });
    reader.readAsDataURL(file);
  }

};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const MAP_WIDTH = document.querySelector(`.map`).offsetWidth;

const KEKS_PIN_FRINGE = {
  top: 130 - PIN_TAIL_HEIGHT - PIN_HEIGHT,
  left: 0 - PIN_WIDTH / 2,
  right: MAP_WIDTH - PIN_WIDTH / 2,
  bottom: 630 - PIN_TAIL_HEIGHT - PIN_HEIGHT
};

mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage());
mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage());
window.dragAndDrop.getTransformElement(mapPinMain, KEKS_PIN_FRINGE);

})();

/******/ })()
;