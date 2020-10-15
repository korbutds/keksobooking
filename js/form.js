'use strict';
(() => {

  window.util.getDisabledElements(window.data.adFormFieldsets);
  window.util.getDisabledElements(window.data.mapFiltersElements);

  window.data.addressInput.value = window.data.mainPinXY;

  const changeRoomTypeValue = (value) => {
    switch (value) {
      case `bungalow`:
        window.data.priceInput.min = 0;
        window.data.priceInput.placeholder = 0;
        break;
      case `flat`:
        window.data.priceInput.min = 1000;
        window.data.priceInput.placeholder = 1000;
        break;
      case `house`:
        window.data.priceInput.min = 5000;
        window.data.priceInput.placeholder = 5000;
        break;
      case `palace`:
        window.data.priceInput.min = 10000;
        window.data.priceInput.placeholder = 10000;
        break;
    }
  };

  changeRoomTypeValue(window.data.roomTypeSelect.value);

  window.data.roomTypeSelect.addEventListener(`change`, (evt) => {
    changeRoomTypeValue(evt.target.value);
  });

  const changeTimeOutValue = (value) => {
    window.data.timeOutSelect.value = value;
  };

  const changeTimeInValue = (value) => {
    window.data.timeInSelect.value = value;
  };

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
    // window.data.adForm.reset();
    console.log(`click`)
    window.data.addressInput.value = window.data.mainPinXY;
    changeRoomNumberValue(window.data.roomsSelect.value);
  });
  window.data.adForm.reset();
  // window.data.adFormReset.addEventListener(`click`, (evt) => {
  //   window.data.addressInput.value = window.data.mainPinXY;
  //   changeRoomNumberValue(window.data.roomsSelect.value);
  // });
})();
