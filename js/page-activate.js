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


const setActivePage = () => {
  return (evt) => {
    if (window.data.serverData) {
      if (orderMap.classList.contains(`map--faded`) && (evt.button === 0 || evt.code === `Enter`)) {
        window.util.getUnDisabledElements(adFormFieldsets);
        window.util.getUnDisabledElements(mapFiltersElements);
        orderMap.classList.remove(`map--faded`);
        adForm.classList.remove(`ad-form--disabled`);
        addressInput.value = `${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
        addressInput.readOnly = true;
        window.map.getPinMap(window.data.serverData);
        avatarLoad.addEventListener(`change`, window.previewCb);
        adPicLoad.addEventListener(`change`, window.previewCb);
      }
    } else {
      window.data = {};
      window.data.getServerData = (pins) => {
        window.data.serverData = pins.slice();
      };
      window.server.load(window.data.getServerData, window.errorMessage);
    }
  };
};

const setDeactivePage = () => {
  window.util.getDisabledElements(adFormFieldsets);
  window.util.getDisabledElements(mapFiltersElements);
  orderMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapPinMain.style.top = mapPinMainCoords.top;
  mapPinMain.style.left = mapPinMainCoords.left;
  addressInput.value = `X: ${Math.round(mapPinMain.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(mapPinMain.offsetTop + PIN_HEIGHT / 2)}`;
  window.pin.getRemovePins();
  avatarLoad.removeEventListener(`change`, window.previewCb);
  adPicLoad.removeEventListener(`change`, window.previewCb);
  window.filter.getFilterReset();
  avatorPreview.querySelector(`img`).src = `img/muffin-grey.svg`;
  adPicPreview.replaceChildren();
};

window.pageActivate = {
  getActivePage: setActivePage,
  getDeactivePage: setDeactivePage
};
