'use strict';
(() => {
  const setActivePage = (mock) => {
    return (evt) => {
      if (evt.button === 0 || evt.code === `Enter`) {
        window.util.getUnDisabledElements(window.data.adFormFieldsets);
        window.util.getUnDisabledElements(window.data.mapFiltersElements);
        window.data.orderMap.classList.remove(`map--faded`);
        window.data.adForm.classList.remove(`ad-form--disabled`);
        window.data.addressInput.value = `X: ${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, Y: ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT + window.data.PIN_TAIL_HEIGHT)}`;
        window.data.addressInput.readOnly = true;
        const mockPins = window.map.getPinFragment(mock);
        window.data.mapSection.appendChild(mockPins);
        const pinsList = window.data.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

        mock.forEach((element, i) => {
          return window.pin.onAdCardClick(pinsList[i], element);
        });
      }
    };
  };

  const setDeactivePage = () => {
    window.util.getDisabledElements(window.data.adFormFieldsets);
    window.util.getDisabledElements(window.data.mapFiltersElements);
    window.data.orderMap.classList.add(`map--faded`);
    window.data.adForm.classList.add(`ad-form--disabled`);
    window.data.addressInput.value = `${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT + window.data.PIN_TAIL_HEIGHT)}`;

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
