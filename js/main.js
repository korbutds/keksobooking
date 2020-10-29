'use strict';
const mapPins = document.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const MAP_WIDTH = document.querySelector(`.map`).offsetWidth;

const KEKS_PIN_FRINGE = {
  top: 130 - PIN_TAIL_HEIGHT - PIN_HEIGHT,
  left: 0 - PIN_WIDTH / 2,
  right: MAP_WIDTH - PIN_WIDTH / 2,
  bottom: 630 - PIN_TAIL_HEIGHT - PIN_HEIGHT
};

mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage());
mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage());
window.dragAndDrop.getTransformElement(mapPinMain, KEKS_PIN_FRINGE);
