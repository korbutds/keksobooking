'use strict';

const orderMap = document.querySelector(`.map`);
const mapPins = orderMap.querySelector(`.map__pins`);
const mapFiltersContainer = orderMap.querySelector(`.map__filters-container`);

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
  if (evt.key === `Escape`) {
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
