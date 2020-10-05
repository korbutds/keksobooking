'use strict';

const orderMap = document.querySelector(`.map`);
const MAP_WIDTH = orderMap.offsetWidth;
const noticeSection = document.querySelector(`.notice`);
const adForm = noticeSection.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`.ad-form > fieldset`);
const roomsSelect = adForm.querySelector(`#room_number`);
const guestsSelect = adForm.querySelector(`#capacity`);
const mapFilters = orderMap.querySelector(`.map__filters`);
const mapFiltersElements = mapFilters.children;
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const addressInput = adForm.querySelector(`#address`);
const priceInput = adForm.querySelector(`#price`);
const roomTypeSelect = adForm.querySelector(`#type`);
const mainPinXY = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;
const PIN_NUMBERS = 8;
const titles = [
  `Милая, уютная квартирка в центре Токио`,
  `Уютное гнездышко для молодоженов`,
  `Идеальный вариант для фотосессии`,
  `Недорогое жилье для студентов`,
  `Жилье в стиле Лофт`,
  `Все что нужно программисту`,
  `Лучше 18 квадратов в этом районе`,
  `Сдам на ночь. Можно и на часы`
];
const types = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const checkTimes = [`12:00`, `13:00`, `14:00`];
const features = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const photos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

// Создания массива пинов на странице.

const createAdsArray = (count) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    const ad = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: titles[i],
        address: `${getRandomIntInclusive(0, 1000)}, ${getRandomIntInclusive(0, 1000)}`,
        price: `${getRandomIntInclusive(1, 10) * 100}`,
        type: getRandomArrayElement(types),
        rooms: getRandomIntInclusive(1, 4),
        guests: getRandomIntInclusive(1, 10),
        checkin: getRandomArrayElement(checkTimes),
        checkout: getRandomArrayElement(checkTimes),
        features: features.slice(0, getRandomIntInclusive(1, features.length - 1)),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        photos: photos.slice(getRandomIntInclusive(0, photos.length - 1))
      },
      location: {
        x: getRandomIntInclusive(PIN_WIDTH, MAP_WIDTH),
        y: getRandomIntInclusive(130, 630)
      }
    };
    ads.push(ad);
  }
  return ads;
};

const mock = createAdsArray(PIN_NUMBERS);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPinFragment = (pins) => {
  const pinFragment = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImage = newPin.querySelector(`img`);
    newPin.style.cssText = `left: ${pins[i].location.x - PIN_WIDTH}px; top: ${pins[i].location.y}px;`;
    pinImage.src = pins[i].author.avatar;
    pinImage.alt = pins[i].offer.title;
    pinFragment.appendChild(newPin);
  }

  return pinFragment;
};

const mapSection = document.querySelector(`.map__pins`);
const pinsByMock = createPinFragment(mock);


// Создание карточки объявления

const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const createFeatureItem = (card, featuresArray) => {
  const popupFeature = card.querySelector(`.popup__features`);
  const featuresList = document.createDocumentFragment();
  for (let i = 0; i < featuresArray.length; i++) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--${featuresArray[i]}`);
    featuresList.appendChild(element);
  }
  popupFeature.innerHTML = ``;
  popupFeature.appendChild(featuresList);
};

const createAdPhotos = (card, photoArray) => {
  const popupPhotos = card.querySelector(`.popup__photos`);
  const emptyImg = popupPhotos.querySelector(`img`).cloneNode(true);
  popupPhotos.innerHTML = ``;

  for (let j = 0; j < photoArray.length; j++) {
    const newPhoto = emptyImg.cloneNode(true);
    newPhoto.src = photoArray[j];
    popupPhotos.appendChild(newPhoto);
  }
};

const createAdCard = (ad) => {
  const cardFragment = document.createDocumentFragment();
  const newCard = cardPopupTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = ad.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = ad.offer.type;
  newCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнат для ${ad.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}`;
  newCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
  createFeatureItem(newCard, ad.offer.features);
  createAdPhotos(newCard, ad.offer.photos);
  cardFragment.appendChild(newCard);

  return cardFragment;
};


// validation

const disabledElements = (disabledArray) => {
  for (const element of disabledArray) {
    element.disabled = true;
  }
};

const unDisabledElements = (undisabledArray) => {
  for (const element of undisabledArray) {
    element.disabled = false;
  }
};

disabledElements(adFormFieldsets);
disabledElements(mapFiltersElements);

addressInput.value = mainPinXY;

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    removeCardPopup(orderMap.querySelector(`.map__card.popup`));
  }
};

const removeCardPopup = (popup) => {
  popup.remove();
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const changeRoomTypeValue = (value) => {
  if (value === `bungalow`) {
    priceInput.min = 0;
  } else if (value === `flat`) {
    priceInput.min = 1000;
  } else if (value === `house`) {
    priceInput.min = 5000;
  } else if (value === `palace`) {
    priceInput.min = 10000;
  }
};

changeRoomTypeValue(roomTypeSelect.value);

roomTypeSelect.addEventListener(`change`, (evt) => {
  changeRoomTypeValue(evt.target.value);
});

const roomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const changeRoomNumberValue = (value) => {
  [...guestsSelect.options].forEach((option) => {
    option.disabled = !roomsForGuests[value].includes(option.value);
  });
  guestsSelect.value = value > 3 ? `0` : value;
};

changeRoomNumberValue(roomsSelect.value);

roomsSelect.addEventListener(`change`, (evt) => {
  changeRoomNumberValue(evt.target.value);
});

// Создание карточки

const addAdCardClickHandler = (pinButton, pinCard) => {
  pinButton.addEventListener(`click`, () => {
    if (orderMap.querySelector(`.map__card.popup`)) {
      removeCardPopup(orderMap.querySelector(`.map__card.popup`));
      orderMap.insertBefore(createAdCard(pinCard), orderMap.querySelector(`.map__filters-container`));
    } else {
      orderMap.insertBefore(createAdCard(pinCard), orderMap.querySelector(`.map__filters-container`));
    }
    document.addEventListener(`keydown`, onPopupEscPress);
    const closeMapPopup = orderMap.querySelector(`.popup__close`);
    closeMapPopup.addEventListener(`click`, () => {
      removeCardPopup(orderMap.querySelector(`.map__card.popup`));
    });
  });
};


const setActivePage = (evt) => {
  if (evt.button === 0 || evt.code === `Enter`) {
    unDisabledElements(adFormFieldsets);
    unDisabledElements(mapFiltersElements);
    orderMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
    mapSection.appendChild(pinsByMock);
    const pinsList = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < mock.length; i++) {
      addAdCardClickHandler(pinsList[i], mock[i]);
    }
  }
};

mapPinMain.addEventListener(`mousedown`, setActivePage);
mapPinMain.addEventListener(`keydown`, setActivePage);

