'use strict';

const titles = [`Милая, уютная квартирка в центре Токио`,
  `Уютное гнездышко для молодоженов`,
  `Идеальный вариант для фотосессии`,
  `Недорогое жилье для студентов`,
  `Жилье в стиле Лофт`,
  `Все что нужно программисту`,
  `Лучше 18 квадратов в этом районе`,
  `Сдам на ночь. Можно и на часы`
];
const orderMap = document.querySelector(`.map`);
const MAP_WIDTH = orderMap.offsetWidth;
const types = [`palace`,
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
    let ad = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: titles[i],
        address: `${getRandomIntInclusive(0, 1000)}, ${getRandomIntInclusive(0, 1000)}`,
        price: getRandomIntInclusive(1000, 10000),
        type: getRandomArrayElement(types),
        rooms: getRandomIntInclusive(1, 4),
        guests: getRandomIntInclusive(1, 10),
        checkin: getRandomArrayElement(checkTimes),
        checkout: getRandomArrayElement(checkTimes),
        features: features.slice(getRandomIntInclusive(0, features.length - 1)),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        photos: photos.slice(getRandomIntInclusive(0, photos.length - 1))
      },
      location: {
        x: getRandomIntInclusive(0, MAP_WIDTH),
        y: getRandomIntInclusive(130, 630)
      }
    };
    ads.push(ad);
  }
  return ads;
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPinFragment = (pin) => {
  const pinFragment = document.createDocumentFragment();
  for (let i = 0; i < pin.length; i++) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImage = newPin.querySelector(`img`);
    const pinWidth = pinImage.offsetWidth;
    const pinHeight = pinImage.offsetHeight;
    newPin.style.cssText = `left: ${pin[i].location.x + pinWidth / 2}px; top: ${pin[i].location.y + pinHeight}px;`;
    pinImage.src = pin[i].author.avatar;
    pinImage.alt = pin[i].offer.title;
    pinFragment.appendChild(newPin);
  }

  return pinFragment;
};

const mapSection = document.querySelector(`.map__pins`);

orderMap.classList.remove(`map--faded`);

mapSection.appendChild(createPinFragment(createAdsArray(8)));

/*
На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

У метки укажите:

Координаты: style=`left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;`
Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.

У изображения метки укажите:

Аватар: src=`{{author.avatar}}`
Альтернативный текст: alt=`{{заголовок объявления}}`
Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
*/


// // Функция для создания элемента массива
// const renderAdt = (author, offer, location) => {
//   let adt = {};
//   adt.author = author;
//   adt.offer = offer;
//   adt.location = location;

//   return adt;
// };

// // Функция для генерации Автора
// const renderAuthor = (i) => {
//   let author = {};
//   author.avatar = `img/avatars/user0${i}.png`;

//   return author;
// };

// // Функция для генерации Описания
// const renderOffer = (i) => {
//   let offer = {};
//   offer.title = titles[i];
//   offer.address = `${randomizer(0, 1000, 50)}, ${randomizer(0, 1000, 50)}`;
//   offer.price = randomizer(1000, 4000, 500);
//   offer.type = types[randomizer(0, 3)];
//   offer.rooms = randomizer(1, 4);
//   offer.guests = randomizer(1, 12);
//   offer.checkin = checkTimes[randomizer(0, 2)];
//   offer.checkout = checkTimes[randomizer(0, 2)];
//   offer.features = features.slice(randomizer(0, (features.length - 1)));
//   offer.description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
//   offer.photos = photos.slice(randomizer(0, (photos.length - 1)));

//   return offer;
// };

// // Функция по созданию локации
// const renderLocation = () => {
//   let location = {};
//   location.x = randomizer(0, orderMap.offsetWidth);
//   location.y = randomizer(130, 630, 10);

//   return location;
// };

// for (let i = 0; i < 8; i++) {
//   adtArr.push(renderAdt(renderAuthor(i + 1), renderOffer(i), renderLocation()));
// }

// orderMap.classList.remove(`map--faded`);

// let pinTemplate = document.querySelector(`#pin`);
// let pinContent = pinTemplate.content;


// const renderPin = (adt) => {
//   let newPin = pinContent.querySelector(`.map__pin`).cloneNode(true);
//   let pin = newPin.querySelector(`.map__pin`);
//   let pinImage = newPin.querySelector(`img`);
//   let pinWidth = pinImage.offsetWidth;
//   let pinHeight = pinImage.offsetHeight;
//   pin.style= `left: ${adt.location.x + pinWidth / 2}px; top: ${adt.location.y + pinHeight / 2}px`;
//   // pinImage.src = adt.author.avatar;
//   // pinImage.alt = adt.offer.title;

//   return console.log(pin);
// };

// renderPin(adtArr[0]);

// let mapSection = document.querySelector(`.map__pins`);

// let fragment = document.createDocumentFragment();

// for (let i = 0; i < adtArr.length; i++) {
//   fragment.appendChild(renderPin(adtArr[i]));
// }

// console.log(fragment);

// // mapSection.appendChild(fragment);


