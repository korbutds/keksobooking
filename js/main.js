'use strict';
const mock = window.map.getAdsArray(window.data.PIN_NUMBERS);

window.server.loadData(window.pageActivate.getActivePage);
window.data.mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage(mock));
window.data.mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage(mock));
window.dragAndDrop.getTransformElement(window.data.mapPinMain, window.data.KEKS_PIN_FRINGE);
