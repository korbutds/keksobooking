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

window.util.setDisabledFormElements(adFormFieldsets);
window.util.setDisabledFormElements(mapFiltersElements);

addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;

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
  window.server.send(new FormData(adForm), window.createSuccessMessage, window.error.uploadErrorMessageOn(customErrorText));
});


adForm.addEventListener(`reset`, (evt) => {
  evt.preventDefault();
  changeRoomNumberValue(roomsSelect.value);
  window.pageActivate.getDeactivePage();
  window.form.getResetForm();

});

const defaultFormValues = {
  roomTypeValue: `flat`,
  roomPrice: 1000,
  numberOfRooms: 1,
  timeInSelect: `12:00`,
  guestsValue: 1
};

const resetForm = () => {
  adTitle.value = ``;
  roomTypeSelect.value = defaultFormValues.roomTypeValue;
  roomsSelect.value = defaultFormValues.numberOfRooms;
  priceInput.value = ``;
  priceInput.placeholder = defaultFormValues.roomPrice;
  description.value = ``;
  timeInSelect.value = defaultFormValues.timeInSelect;
  timeOutSelect.value = timeInSelect.value;
  guestsSelect.value = defaultFormValues.guestsValue;
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
