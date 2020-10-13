'use strict';

window.data.mapPinMain.addEventListener(`mousedown`, window.pageActivate.getActivePage());
window.data.mapPinMain.addEventListener(`keydown`, window.pageActivate.getActivePage());
window.dragAndDrop.getTransformElement(window.data.mapPinMain, window.data.KEKS_PIN_FRINGE);
