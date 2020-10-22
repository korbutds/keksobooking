'use strict';
(() => {
  const PIN_NUMBER = 5;
  const createAdsArray = (count) => {
    const ads = [];
    for (let i = 0; i < count; i++) {
      const ad = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: window.data.titles[i],
          address: `${window.util.getRandomIntInclusive(0, 1000)}, ${window.util.getRandomIntInclusive(0, 1000)}`,
          price: `${window.util.getRandomIntInclusive(1, 10) * 100}`,
          type: window.util.getRandomArrayElement(window.data.types),
          rooms: window.util.getRandomIntInclusive(1, 4),
          guests: window.util.getRandomIntInclusive(1, 10),
          checkin: window.util.getRandomArrayElement(window.data.checkTimes),
          checkout: window.util.getRandomArrayElement(window.data.checkTimes),
          features: window.data.features.slice(0, window.util.getRandomIntInclusive(1, window.data.features.length - 1)),
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          photos: window.data.photos.slice(window.util.getRandomIntInclusive(0, window.data.photos.length - 1))
        },
        location: {
          x: window.util.getRandomIntInclusive(window.data.PIN_WIDTH, window.data.MAP_WIDTH),
          y: window.util.getRandomIntInclusive(130, 630)
        }
      };
      ads.push(ad);
    }
    return ads;
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


  const createPinFragment = (pins) => {
    const pinFragment = document.createDocumentFragment();
    if (pins.length > PIN_NUMBER) {
      for (let i = 0; i < PIN_NUMBER; i++) {
        const newPin = pinTemplate.cloneNode(true);
        const pinImage = newPin.querySelector(`img`);
        newPin.style.cssText = `left: ${pins[i].location.x - window.data.PIN_WIDTH}px; top: ${pins[i].location.y}px;`;
        pinImage.src = pins[i].author.avatar;
        pinImage.alt = pins[i].offer.title;
        pinFragment.appendChild(newPin);
      }

      return pinFragment;

    } else {
      for (let i = 0; i < pins.length; i++) {
        const newPin = pinTemplate.cloneNode(true);
        const pinImage = newPin.querySelector(`img`);
        newPin.style.cssText = `left: ${pins[i].location.x - window.data.PIN_WIDTH}px; top: ${pins[i].location.y}px;`;
        pinImage.src = pins[i].author.avatar;
        pinImage.alt = pins[i].offer.title;
        pinFragment.appendChild(newPin);
      }

      return pinFragment;
    }
  };

  const createPinsMap = (pins) => {
    const mockPins = createPinFragment(pins);
    window.data.mapSection.appendChild(mockPins);
    const pinsList = window.data.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((element, i) => {
      return window.pin.onAdCardClick(pinsList[i], element);
    });
  };

  window.map = {
    getAdsArray: createAdsArray,
    getPinFragment: createPinFragment,
    getPinMap: createPinsMap
  };
})();
