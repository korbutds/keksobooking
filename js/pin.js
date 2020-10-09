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
})();
