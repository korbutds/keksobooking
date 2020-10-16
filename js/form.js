'use strict';
(() => {

  window.util.getDisabledElements(window.data.adFormFieldsets);
  window.util.getDisabledElements(window.data.mapFiltersElements);

  window.data.addressInput.value = window.data.mainPinXY;

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
    window.data.priceInput.min = roomPrice;
    window.data.priceInput.placeholder = roomPrice;
  };

  const changeTimeOutValue = (value) => {
    window.data.timeOutSelect.value = value;
  };

  const changeTimeInValue = (value) => {
    window.data.timeInSelect.value = value;
  };

  changeRoomTypeValue(window.data.roomTypeSelect.value);

  window.data.roomTypeSelect.addEventListener(`change`, (evt) => {
    changeRoomTypeValue(evt.target.value);
  });


  changeTimeOutValue(window.data.timeInSelect.value);

  window.data.timeInSelect.addEventListener(`change`, (evt) => {
    changeTimeOutValue(evt.target.value);
  });

  window.data.timeOutSelect.addEventListener(`change`, (evt) =>{
    changeTimeInValue(evt.target.value);
  });

  const roomsForGuests = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const changeRoomNumberValue = (value) => {
    [...window.data.guestsSelect.options].forEach((option) => {
      option.disabled = !roomsForGuests[value].includes(option.value);
    });
    window.data.guestsSelect.value = value > 3 ? `0` : value;
  };

  changeRoomNumberValue(window.data.roomsSelect.value);

  window.data.roomsSelect.addEventListener(`change`, (evt) => {
    changeRoomNumberValue(evt.target.value);
  });

  window.data.adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.server.getServerRequest(window.data.saveData, window.server.getSuccessMessage, window.server.getErrorMessage, new FormData(window.data.adForm));
  });


  window.data.adForm.addEventListener(`reset`, (evt) => {
    evt.preventDefault();
    changeRoomNumberValue(window.data.roomsSelect.value);
    window.pageActivate.getDeactivePage();
  });

  window.form = {
    getChangeRoomTypeValue: changeRoomTypeValue
  };
})();
