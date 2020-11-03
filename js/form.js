'use strict';

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
