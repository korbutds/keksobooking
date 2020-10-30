'use strict';
const PIN_NUMBER = 5;
const orderMap = document.querySelector(`.map`);
const mapPins = orderMap.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const mapSection = document.querySelector(`.map__pins`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPinFragment = (pins) => {
  const pinFragment = document.createDocumentFragment();
  let pinsCount;
  if (pins.length > PIN_NUMBER) {
    pinsCount = PIN_NUMBER;
  } else {
    pinsCount = pins.length;
  }
  for (let i = 0; i < pinsCount; i++) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImage = newPin.querySelector(`img`);
    newPin.style.cssText = `left: ${pins[i].location.x - PIN_WIDTH}px; top: ${pins[i].location.y}px;`;
    pinImage.src = pins[i].author.avatar;
    pinImage.alt = pins[i].offer.title;
    pinFragment.appendChild(newPin);
  }

  return pinFragment;
};

const createPinsMap = (pins) => {
  const mockPins = createPinFragment(pins);
  mapSection.appendChild(mockPins);
  const pinsList = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  let pinsCount;
  if (pins.length > PIN_NUMBER) {
    pinsCount = PIN_NUMBER;
  } else {
    pinsCount = pins.length;
  }

  for (let i = 0; i < pinsCount; i++) {
    window.pin.onAdCardClick(pinsList[i], pins[i]);
  }
};

window.map = {
  getPinFragment: createPinFragment,
  getPinMap: createPinsMap
};
