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

const setDisabledFormElements = (disabledArray) => {
  for (const element of disabledArray) {
    element.disabled = true;
  }
};

const setUnDisabledFormElements = (undisabledArray) => {
  for (const element of undisabledArray) {
    element.disabled = false;
  }
};

window.util = {
  getRandomIntInclusive: getRandomNumber,
  getRandomArrayElement: getRandomElement,
  setDisabledFormElements,
  setUnDisabledFormElements
};

})();

(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// 'use strict';


const STATUS_CODE = {
  OK: 200
};

const MethodUrls = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`
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
  xhr.open(`GET`, MethodUrls.GET);
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.send();
};

const send = (data, successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();
  xhr.open(`POST`, MethodUrls.POST);
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.send(data);
};

window.server = {
  load,
  send
};

})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.data = {};
const getServerData = (data) => {
  window.data.serverData = data.filter((pin) => pin.offer);
};

const downloadErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.server.load(getServerData, downloadErrorMessage);


})();

(() => {
/*!*****************************!*\
  !*** ./js/error-message.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const main = document.querySelector(`main`);
const error = document.querySelector(`#error`)
.content
.querySelector(`.error`);

const KeyboardButtons = {
  ESCAPE: `Escape`
};

const errorElement = error.cloneNode(true);
const errorMessage = errorElement.querySelector(`.error__message`);
const errorButton = errorElement.querySelector(`.error__button`);

const createErrorPopup = (errorText) => {
  errorMessage.textContent = errorText;
  main.insertAdjacentElement(`beforeend`, errorElement);
  errorButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`click`, onErrorPopupClick);
  document.addEventListener(`keydown`, onErrorEscPress);
};

const removeErrorPopup = () => {
  main.removeChild(errorElement);
  errorButton.removeEventListener(`click`, onErrorButtonClick);
  document.removeEventListener(`click`, onErrorPopupClick);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorButtonClick = () => {
  removeErrorPopup();
};

const onErrorPopupClick = () => {
  removeErrorPopup();
};

const onErrorEscPress = (evt) => {
  if (evt.key === KeyboardButtons.ESCAPE) {
    removeErrorPopup();
  }
};

const uploadErrorMessage = (errorText) => {
  return () => {
    createErrorPopup(errorText);
  };
};

window.error = {
  uploadErrorMessage
};

})();

(() => {
/*!*******************************!*\
  !*** ./js/success-message.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const main = document.querySelector(`main`);
const successTemplate = document.querySelector(`#success`)
.content
.querySelector(`.success`);

const KeyboardButtons = {
  ESCAPE: `Escape`
};

const newSuccessMessage = successTemplate.cloneNode(true);

window.createSuccessMessage = () => {
  main.appendChild(newSuccessMessage);
  window.pageActivate.getDeactivePage();
  document.querySelector(`.ad-form`).reset();
  document.addEventListener(`click`, onSuccessMessageClick);
  document.addEventListener(`keydown`, onSuccessMessageEscape);
};

const removeSuccessMessage = () => {
  newSuccessMessage.remove();
  document.removeEventListener(`click`, onSuccessMessageClick);
  document.removeEventListener(`keydown`, onSuccessMessageEscape);
};

const onSuccessMessageClick = (evt) => {
  if (evt.button === 0) {
    removeSuccessMessage();
  }
};
const onSuccessMessageEscape = (evt) => {
  if (evt.code === KeyboardButtons.ESCAPE) {
    removeSuccessMessage();
  }
};


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
const DefaultAvatarImageStyles = {
  WIDTH: `40px`,
  HEIGHT: `44px`,
  SRC: `img/muffin-grey.svg`
};
const avatarLoad = document.querySelector(`#avatar`);
const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicLoad = document.querySelector(`#images`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const addressInput = adForm.querySelector(`#address`);


const setActivePage = (evt) => {
  if (orderMap.classList.contains(`map--faded`) && (evt.button === 0 || evt.code === `Enter`)) {
    window.util.setUnDisabledFormElements(adFormFieldsets);
    window.util.setUnDisabledFormElements(mapFiltersElements);
    orderMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
    addressInput.readOnly = true;
    window.map.getPinMap(window.data.serverData);
    avatarLoad.addEventListener(`change`, window.addPreviewImage);
    adPicLoad.addEventListener(`change`, window.addPreviewImage);
  }
};

const setDeactivePage = () => {
  const avatarImg = avatorPreview.querySelector(`img`);
  window.util.setDisabledFormElements(adFormFieldsets);
  window.util.setDisabledFormElements(mapFiltersElements);
  orderMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapPinMain.style.top = mapPinMainCoords.top;
  mapPinMain.style.left = mapPinMainCoords.left;
  addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;
  window.pin.getRemovePins();
  avatarLoad.removeEventListener(`change`, window.addPreviewImage);
  adPicLoad.removeEventListener(`change`, window.addPreviewImage);
  window.filter.resetFilters();
  avatarImg.style.width = DefaultAvatarImageStyles.WIDTH;
  avatarImg.style.height = DefaultAvatarImageStyles.HEIGHT;
  avatarImg.src = DefaultAvatarImageStyles.SRC;
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
const orderMap = document.querySelector(`.map`);
const mapPins = orderMap.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const mapSection = document.querySelector(`.map__pins`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPinFragment = (pins) => {
  const pinFragment = document.createDocumentFragment();
  let pinsCount = (pins.length > PIN_NUMBER) ? PIN_NUMBER : pins.length;
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
  let pinsCount = (pins.length > PIN_NUMBER) ? PIN_NUMBER : pins.length;

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


const dragAndDropPin = (element, limits, modal = element) => {
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

      if (modal.offsetTop < limits.TOP) {
        modal.style.top = `${limits.TOP}px`;
      } else if (modal.offsetTop > limits.BOTTOM) {
        modal.style.top = `${limits.BOTTOM}px`;
      } else if (modal.offsetLeft < limits.LEFT) {
        modal.style.left = `${limits.LEFT}px`;
      } else if (modal.offsetLeft > limits.RIGHT) {
        modal.style.left = `${limits.RIGHT}px`;
      }

      addressInput.value = `${Math.round(modal.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(modal.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
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
  dragAndDropPin
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const customErrorText = `Custom Error Text`;
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

const DefaultFormValues = {
  ROOM_TYPE_VALUE: `flat`,
  ROOM_PRICE: 1000,
  NUMBER_OF_ROOMS: 1,
  TIME_IN_SELECT: `12:00`,
  GUESTS_VALUE: 1
};

const RoomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const RoomsPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

window.util.setDisabledFormElements(adFormFieldsets);
window.util.setDisabledFormElements(mapFiltersElements);

addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;

const changeRoomTypeValue = (value) => {
  let roomPrice = 0;
  switch (value) {
    case `bungalow`:
      roomPrice = RoomsPrices.BUNGALOW;
      break;
    case `flat`:
      roomPrice = RoomsPrices.FLAT;
      break;
    case `house`:
      roomPrice = RoomsPrices.HOUSE;
      break;
    case `palace`:
      roomPrice = RoomsPrices.PALACE;
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

const changeRoomNumberValue = (value) => {
  [...guestsSelect.options].forEach((option) => {
    option.disabled = !RoomsForGuests[value].includes(option.value);
  });
  guestsSelect.value = value > 3 ? `0` : value;
};

changeRoomNumberValue(roomsSelect.value);

roomsSelect.addEventListener(`change`, (evt) => {
  changeRoomNumberValue(evt.target.value);
});

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.server.send(new FormData(adForm), window.createSuccessMessage, window.error.uploadErrorMessage(customErrorText));
});

adForm.addEventListener(`reset`, (evt) => {
  evt.preventDefault();
  changeRoomNumberValue(roomsSelect.value);
  window.pageActivate.getDeactivePage();
  window.form.getResetForm();
});

const resetForm = () => {
  adTitle.value = ``;
  roomTypeSelect.value = DefaultFormValues.ROOM_TYPE_VALUE;
  roomsSelect.value = DefaultFormValues.NUMBER_OF_ROOMS;
  priceInput.value = ``;
  priceInput.placeholder = DefaultFormValues.ROOM_PRICE;
  description.value = ``;
  timeInSelect.value = DefaultFormValues.TIME_IN_SELECT;
  timeOutSelect.value = timeInSelect.value;
  guestsSelect.value = DefaultFormValues.GUESTS_VALUE;
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
  const {author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout}} = ad;
  const avatarElement = newCard.querySelector(`.popup__avatar`);
  avatarElement.src = avatar ? avatar : avatarElement.remove();

  const titleElement = newCard.querySelector(`.popup__title`);
  titleElement.textContent = title ? title : titleElement.remove();

  const addressElement = newCard.querySelector(`.popup__text--address`);
  addressElement.textContent = address ? address : addressElement.remove();

  const priceElement = newCard.querySelector(`.popup__text--price`);
  priceElement.textContent = price ? `${price} ₽/ночь` : priceElement.remove();

  const typeElement = newCard.querySelector(`.popup__type`);
  typeElement.textContent = type ? type : typeElement.remove();

  const capacityElement = newCard.querySelector(`.popup__text--capacity`);
  capacityElement.textContent = (rooms && guests) ? `${rooms} комнат для ${guests} гостей` : capacityElement.remove();

  const checkTimeElement = newCard.querySelector(`.popup__text--time`);
  checkTimeElement.textContent = (checkin && checkout) ? `Заезд после ${checkin} выезд до ${checkout}` : checkTimeElement.remove();

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
const KeyboardButtons = {
  ESCAPE: `Escape`
};

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
  if (evt.key === KeyboardButtons.ESCAPE) {
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

  return (...parameters) => {
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

const PriceLimits = {
  LOW: 10000,
  HIGH: 50000
};

const getFilterData = () => {
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
          return (pin.offer.price >= PriceLimits.LOW) && (pin.offer.price <= PriceLimits.HIGH);
        case `low`:
          return pin.offer.price < PriceLimits.LOW;
        case `high`:
          return pin.offer.price > PriceLimits.HIGH;
        default:
          return false;
      }
    });
  };

  const filterPinsByRooms = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.rooms === Number(value);
    });
  };

  const filterPinsByGuests = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.guests === Number(value);
    });
  };

  const Filters = [
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

  Filters.forEach((obj) => {
    const selectValue = obj.name.value;
    if (selectValue !== `any`) {
      obj.filterFunction(selectValue);
    }
  });

  window.map.getPinMap(pins);
};

mapFilters.addEventListener(`change`, window.debounce(getFilterData));

const resetFilters = () => {
  mapFilters.querySelectorAll(`select`).forEach((select) => {
    select.value = `any`;
  });
  housingFeaturesList.forEach((element) => {
    element.checked = false;
  });
};

window.filter = {
  resetFilters
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
const PreviewImageStyles = {
  WIDTH: `70px`,
  HEIGHT: `70px`,
  BORDER_RADIUS: `5px`
};

const previewDict = {
  'avatar': avatorPreview,
  'images': adPicPreview
};

window.addPreviewImage = (evt) => {
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
      img.style.width = PreviewImageStyles.WIDTH;
      img.style.height = PreviewImageStyles.HEIGHT;
      img.style.borderRadius = PreviewImageStyles.BORDER_RADIUS;
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
  TOP: 130 - PIN_TAIL_HEIGHT - PIN_HEIGHT,
  LEFT: 0 - PIN_WIDTH / 2,
  RIGHT: MAP_WIDTH - PIN_WIDTH / 2,
  BOTTOM: 630 - PIN_TAIL_HEIGHT - PIN_HEIGHT
};

mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage);
mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage);
window.dragAndDrop.dragAndDropPin(mapPinMain, KEKS_PIN_FRINGE);

})();

/******/ })()
;