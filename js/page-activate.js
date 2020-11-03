'use strict';

const orderMap = document.querySelector(`.map`);
const noticeSection = document.querySelector(`.notice`);
const mapPins = orderMap.querySelector(`.map__pins`);
const adForm = noticeSection.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`.ad-form > fieldset`);
const mapFiltersContainer = orderMap.querySelector(`.map__filters-container`);
const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
const mapFiltersElements = mapFilters.children;
const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const mapPinMainCoords = {
  left: `570px`,
  top: `375px`
};
const avatarLoad = document.querySelector(`#avatar`);
const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicLoad = document.querySelector(`#images`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIN_WIDTH = mapPinMain.offsetWidth;
const PIN_HEIGHT = mapPinMain.offsetHeight;
const PIN_TAIL_HEIGHT = 22;
const addressInput = adForm.querySelector(`#address`);


const setActivePage = (evt) => {
  if (orderMap.classList.contains(`map--faded`) && (evt.button === 0 || evt.code === `Enter`)) {
    window.util.setUnDisabledFormElements(adFormFieldsets);
    window.util.setUnDisabledFormElements(mapFiltersElements);
    orderMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
    addressInput.readOnly = true;
    window.map.getPinMap(window.data.serverData);
    avatarLoad.addEventListener(`change`, window.addPreviewImage);
    adPicLoad.addEventListener(`change`, window.addPreviewImage);
  }
};

const setDeactivePage = () => {
  window.util.setDisabledFormElements(adFormFieldsets);
  window.util.setDisabledFormElements(mapFiltersElements);
  orderMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapPinMain.style.top = mapPinMainCoords.top;
  mapPinMain.style.left = mapPinMainCoords.left;
  addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;
  window.pin.getRemovePins();
  avatarLoad.removeEventListener(`change`, window.addPreviewImage);
  adPicLoad.removeEventListener(`change`, window.addPreviewImage);
  window.filter.resetFilters();
  avatorPreview.querySelector(`img`).src = `img/muffin-grey.svg`;
  adPicPreview.replaceChildren();
};

window.pageActivate = {
  getActivePage: setActivePage,
  getDeactivePage: setDeactivePage
};
