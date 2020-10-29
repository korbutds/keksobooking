'use strict';
const PIN_NUMBER = 5;
// const createAdsArray = (count) => {
//   const ads = [];
//   for (let i = 0; i < count; i++) {
//     const ad = {
//       author: {
//         avatar: `img/avatars/user0${i + 1}.png`
//       },
//       offer: {
//         title: titles[i],
//         address: `${window.util.getRandomIntInclusive(0, 1000)}, ${window.util.getRandomIntInclusive(0, 1000)}`,
//         price: `${window.util.getRandomIntInclusive(1, 10) * 100}`,
//         type: window.util.getRandomArrayElement(types),
//         rooms: window.util.getRandomIntInclusive(1, 4),
//         guests: window.util.getRandomIntInclusive(1, 10),
//         checkin: window.util.getRandomArrayElement(checkTimes),
//         checkout: window.util.getRandomArrayElement(checkTimes),
//         features: features.slice(0, window.util.getRandomIntInclusive(1, features.length - 1)),
//         description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
//         photos: photos.slice(window.util.getRandomIntInclusive(0, photos.length - 1))
//       },
//       location: {
//         x: window.util.getRandomIntInclusive(PIN_WIDTH, MAP_WIDTH),
//         y: window.util.getRandomIntInclusive(130, 630)
//       }
//     };
//     ads.push(ad);
//   }
//   return ads;
// };

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
