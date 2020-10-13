'use strict';

(() => {
  window.data = {};

  window.data.orderMap = document.querySelector(`.map`);
  window.data.noticeSection = document.querySelector(`.notice`);
  window.data.mapPins = window.data.orderMap.querySelector(`.map__pins`);
  window.data.MAP_WIDTH = window.data.orderMap.offsetWidth;
  window.data.adForm = window.data.noticeSection.querySelector(`.ad-form`);
  window.data.adFormFieldsets = window.data.adForm.querySelectorAll(`.ad-form > fieldset`);
  window.data.adFormSubmit = window.data.adForm.querySelector(`.ad-form__submit`);
  window.data.mapFiltersContainer = window.data.orderMap.querySelector(`.map__filters-container`);
  window.data.mapFilters = window.data.mapFiltersContainer.querySelector(`.map__filters`);
  window.data.mapFiltersElements = window.data.mapFilters.children;
  window.data.mapPinMain = window.data.mapPins.querySelector(`.map__pin--main`);
  window.data.PIN_WIDTH = window.data.mapPinMain.offsetWidth;
  window.data.PIN_HEIGHT = window.data.mapPinMain.offsetHeight;
  window.data.PIN_TAIL_HEIGHT = 22;
  window.data.guestsSelect = window.data.adForm.querySelector(`#capacity`);
  window.data.roomsSelect = window.data.adForm.querySelector(`#room_number`);
  window.data.roomTypeSelect = window.data.adForm.querySelector(`#type`);
  window.data.timeInSelect = window.data.adForm.querySelector(`#timein`);
  window.data.timeOutSelect = window.data.adForm.querySelector(`#timeout`);
  window.data.addressInput = window.data.adForm.querySelector(`#address`);
  window.data.priceInput = window.data.adForm.querySelector(`#price`);
  window.data.mainPinXY = `X: ${Math.round(window.data.mapPinMain.offsetLeft + window.data.PIN_WIDTH / 2)}, Y: ${Math.round(window.data.mapPinMain.offsetTop + window.data.PIN_HEIGHT / 2)}`;
  window.data.PIN_NUMBERS = 8;
  window.data.titles = [
    `Милая, уютная квартирка в центре Токио`,
    `Уютное гнездышко для молодоженов`,
    `Идеальный вариант для фотосессии`,
    `Недорогое жилье для студентов`,
    `Жилье в стиле Лофт`,
    `Все что нужно программисту`,
    `Лучше 18 квадратов в этом районе`,
    `Сдам на ночь. Можно и на часы`
  ];
  window.data.types = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
  window.data.checkTimes = [`12:00`, `13:00`, `14:00`];
  window.data.features = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  window.data.photos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  window.data.mapSection = document.querySelector(`.map__pins`);
  window.data.KEKS_PIN_FRINGE = {
    top: 130 - window.data.PIN_TAIL_HEIGHT - window.data.PIN_HEIGHT,
    left: 0 - window.data.PIN_WIDTH / 2,
    right: window.data.MAP_WIDTH - window.data.PIN_WIDTH / 2,
    bottom: 630 - window.data.PIN_TAIL_HEIGHT - window.data.PIN_HEIGHT
  };
})();

