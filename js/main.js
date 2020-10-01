'use strict';

const orderMap = document.querySelector(`.map`);
const MAP_WIDTH = orderMap.offsetWidth;
const PIN_WIDTH = orderMap.querySelector(`.map__pin`).offsetWidth;
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

// Функция возвращающее произвольное число
const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая произвольный жлемент массива
const getRandomArrayElement = (array) => {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

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

orderMap.classList.remove(`map--faded`);

mapSection.appendChild(createPinFragment(createAdsArray(PIN_NUMBERS)));

const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const createFeatureItem = (card, array) => {
  const popupFeature = card.querySelector(`.popup__features`);
  const featuresList = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--${array[i]}`);
    featuresList.appendChild(element);
  }
  popupFeature.innerHTML = ``;
  popupFeature.appendChild(featuresList);
};

const createAdPhotos = (card, array) => {
  const popupPhotos = card.querySelector(`.popup__photos`);
  const emptyImg = popupPhotos.querySelector(`img`).cloneNode(true);
  popupPhotos.innerHTML = ``;

  for (let j = 0; j < array.length; j++) {
    const newPhoto = emptyImg.cloneNode(true);
    newPhoto.src = array[j];
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

  createFeatureItem(newCard, ad.offer.features);

  createAdPhotos(newCard, ad.offer.photos);

  const popupAvator = newCard.querySelector(`.popup__avatar`);

  popupAvator.src = ad.author.avatar;
  cardFragment.appendChild(newCard);

  return cardFragment;
};

orderMap.insertBefore(createAdCard(mock[0]), orderMap.querySelector(`.map__filters-container`));
