'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesList = mapFilters.querySelectorAll(`.map__checkbox`);
  const filterFunc = () => {
    let pins = window.data.serverData.slice();
    window.pin.getRemovePopup();
    window.pin.getRemovePins();

    housingFeaturesList.forEach((element) => {
      if (element.checked) {
        const checkedElementFeature = element.id.replace(/filter-/gi, ``);
        pins = pins.filter((pin) => {
          return pin.offer.features.includes(checkedElementFeature);
        });
      }
    });

    const pinTypeFunction = (value) => {
      pins = pins.filter((pin) => {
        if (value !== `any`) {
          return pin.offer.type === value;
        }
        return pin.offer.type !== value;
      });
    };

    const pinPriceFunction = (value) => {
      pins = pins.filter((pin) => {
        switch (value) {
          case `middle`:
            return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
          case `low`:
            return pin.offer.price < 10000;
          case `high`:
            return pin.offer.price > 50000;
        }
        return pin.offer.price !== value;
      });
    };

    const pinRoomsFunction = (value) => {
      pins = pins.filter((pin) => {
        switch (value) {
          case `1`:
            return pin.offer.rooms === 1;
          case `2`:
            return pin.offer.rooms === 2;
          case `3`:
            return pin.offer.rooms === 3;
        }
        return pin.offer.price !== value;
      });
    };

    const pinsGuestsFunction = (value) => {
      pins = pins.filter((pin) => {
        switch (value) {
          case `1`:
            return pin.offer.guests === 1;
          case `2`:
            return pin.offer.guests === 2;
          case `0`:
            return pin.offer.guests === 0;
        }
        return pin.offer.price !== value;
      });
    };

    switch (housingTypeFilter.value) {
      case `palace`:
        pinTypeFunction(`palace`);
        break;
      case `flat`:
        pinTypeFunction(`flat`);
        break;
      case `house`:
        pinTypeFunction(`house`);
        break;
      case `bungalow`:
        pinTypeFunction(`bungalow`);
        break;
      case `any`:
        pinTypeFunction(`any`);
        break;
    }

    switch (housingPriceFilter.value) {
      case `middle`:
        pinPriceFunction(`middle`);
        break;
      case `low`:
        pinPriceFunction(`low`);
        break;
      case `high`:
        pinPriceFunction(`high`);
        break;
    }

    switch (housingRoomsFilter.value) {
      case `1`:
        pinRoomsFunction(`1`);
        break;
      case `2`:
        pinRoomsFunction(`2`);
        break;
      case `3`:
        pinRoomsFunction(`3`);
        break;
    }

    switch (housingGuestsFilter.value) {
      case `1`:
        pinsGuestsFunction(`1`);
        break;
      case `2`:
        pinsGuestsFunction(`2`);
        break;
      case `0`:
        pinsGuestsFunction(`0`);
        break;
    }

    window.map.getPinMap(pins);
  };

  mapFilters.addEventListener(`change`, window.debounce(filterFunc));

  const filterReset = () => {
    mapFilters.querySelectorAll(`select`).forEach((select) => {
      select.value = `any`;
    });
    housingFeaturesList.forEach((element) => {
      element.checked = false;
    });
  };

  window.filter = {
    getFilterReset: filterReset
  };
})();
