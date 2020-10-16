'use strict';
(() => {
  const setActivePage = () => {
    return (evt) => {
      if (window.data.orderMap.classList.contains(`map--faded`) && (evt.button === 0 || evt.code === `Enter`)) {
        window.util.getUnDisabledElements(window.data.adFormFieldsets);
        window.util.getUnDisabledElements(window.data.mapFiltersElements);
        window.data.orderMap.classList.remove(`map--faded`);
        window.data.adForm.classList.remove(`ad-form--disabled`);
        window.data.addressInput.value = `X: ${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, Y: ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT + window.data.PIN_TAIL_HEIGHT)}`;
        window.data.addressInput.readOnly = true;
        window.map.getPinMap(window.data.serverData);
      }
    };
  };

  const standartValue = {
    title: ``,
    roomTypeValue: `flat`,
    roomPrice: 1000,
    numberOfRooms: 1,
    timeInSelect: `12:00`,
    guestsValue: 1
  };

  const setDeactivePage = () => {
    window.util.getDisabledElements(window.data.adFormFieldsets);
    window.util.getDisabledElements(window.data.mapFiltersElements);
    window.data.orderMap.classList.add(`map--faded`);
    window.data.adForm.classList.add(`ad-form--disabled`);
    window.data.mapPinMain.style.top = window.data.mapPinMainCoords.top;
    window.data.mapPinMain.style.left = window.data.mapPinMainCoords.left;
    window.data.addressInput.value = `X: ${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT / 2)}`;
    window.data.adTitle.value = ``;
    window.data.roomTypeSelect.value = standartValue.roomTypeValue;
    window.data.roomsSelect.value = standartValue.numberOfRooms;
    window.data.priceInput.value = ``;
    window.data.priceInput.placeholder = standartValue.roomPrice;
    window.data.description.value = ``;
    window.data.timeInSelect.value = standartValue.timeInSelect;
    window.data.timeOutSelect.value = window.data.timeInSelect.value;
    window.data.guestsSelect.value = standartValue.guestsValue;
    [...window.data.featuresCheckboxes].forEach((checkbox) => {
      checkbox.checked = false;
    });
    const pinsList = window.data.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pinsList.forEach((element) => {
      element.remove();
    });
  };

  window.pageActivate = {
    getActivePage: setActivePage,
    getDeactivePage: setDeactivePage
  };
})();
