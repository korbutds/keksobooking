'use strict';
(() => {
  const activatePin = (pin) => {
    pin.classList.add(`map__pin--active`);
  };

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

  const onCardElementClick = (pinButton, pinCard) => {
    pinButton.addEventListener(`click`, () => {
      const mapCardPoput = window.data.orderMap.querySelector(`.map__card.popup`);
      if (mapCardPoput) {
        unactivatePin();
        removeCardPopup();
        window.data.orderMap.insertBefore(window.card.getAdCard(pinCard), window.data.mapFiltersContainer);
        activatePin(pinButton);
      } else {
        window.data.orderMap.insertBefore(window.card.getAdCard(pinCard), window.data.mapFiltersContainer);
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

  window.pin = {
    onAdCardClick: onCardElementClick
  };
})();
