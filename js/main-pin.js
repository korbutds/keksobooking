'use strict';
(() => {
  const unactivatePin = () => {
    const mapPin = window.data.mapPins.querySelectorAll(`.map__pin`);
    mapPin.forEach((pin) => {
      pin.classList.remove(`map__pin--active`);
    });
  };

  const removeCardPopup = () => {
    window.data.orderMap.querySelector(`.map__card.popup`).remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      removeCardPopup(window.data.orderMap.querySelector(`.map__card.popup`));
      unactivatePin();
    }
  };

  const activatePin = (pin) => {
    pin.classList.add(`map__pin--active`);
  };

  const addAdCardClickHandler = (pinButton, pinCard) => {
    pinButton.addEventListener(`click`, () => {
      const mapCardPoput = window.data.orderMap.querySelector(`.map__card.popup`);
      if (mapCardPoput) {
        unactivatePin();
        removeCardPopup();
        window.data.orderMap.insertBefore(window.card.getAdCard(pinCard), window.data.mapFiletersContainer);
        activatePin(pinButton);
      } else {
        window.data.orderMap.insertBefore(window.card.getAdCard(pinCard), window.data.mapFiletersContainer);
        activatePin(pinButton);
      }
      document.addEventListener(`keydown`, onPopupEscPress);
      const closeMapPopup = window.data.orderMap.querySelector(`.popup__close`);
      closeMapPopup.addEventListener(`click`, () => {
        removeCardPopup();
        unactivatePin();
      });
    });
  };

  const setActivePage = (evt) => {
    if (evt.button === 0 || evt.code === `Enter`) {
      window.util.getUnDisabledElements(window.data.adFormFieldsets);
      window.util.getUnDisabledElements(window.data.mapFiltersElements);
      window.data.orderMap.classList.remove(`map--faded`);
      window.data.adForm.classList.remove(`ad-form--disabled`);
      window.data.addressInput.value = `${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT + window.data.PIN_TAIL_HEIGHT)}`;
      window.data.addressInput.readOnly = true;
      window.data.mapSection.appendChild(window.map.mockPins);
      const pinsList = window.data.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      window.map.mock.forEach((element, i) => {
        addAdCardClickHandler(pinsList[i], element);
      });
    }
  };
  window.data.mapPinMain.addEventListener(`mousedown`, setActivePage);
  window.data.mapPinMain.addEventListener(`keydown`, setActivePage);
  window.util.getElementMove(window.data.mapPinMain);
})();
