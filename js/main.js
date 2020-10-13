'use strict';
const mock = window.map.getAdsArray(window.data.PIN_NUMBERS);
const mockPins = window.map.getPinFragment(mock);

window.data.mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage(mock, mockPins));
window.data.mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage(mock));
window.dragAndDrop.getTransformElement(window.data.mapPinMain, window.data.KEKS_PIN_FRINGE);
