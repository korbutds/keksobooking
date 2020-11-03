'use strict';

const mapFilters = document.querySelector(`.map__filters`);
const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
const housingFeaturesList = mapFilters.querySelectorAll(`.map__checkbox`);

const PriceLimits = {
  LOW: 10000,
  HIGH: 50000
};

const getFilterData = () => {
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

  const filterPinsByType = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.type === value;
    });
  };

  const filterPinsByPrice = (value) => {
    pins = pins.filter((pin) => {
      switch (value) {
        case `middle`:
          return (pin.offer.price >= PriceLimits.LOW) && (pin.offer.price <= PriceLimits.HIGH);
        case `low`:
          return pin.offer.price < PriceLimits.LOW;
        case `high`:
          return pin.offer.price > PriceLimits.HIGH;
        default:
          return false;
      }
    });
  };

  const filterPinsByRooms = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.rooms === Number(value);
    });
  };

  const filterPinsByGuests = (value) => {
    pins = pins.filter((pin) => {
      return pin.offer.guests === Number(value);
    });
  };

  const Filters = [
    {
      name: housingTypeFilter,
      filterFunction: filterPinsByType
    },
    {
      name: housingPriceFilter,
      filterFunction: filterPinsByPrice
    },
    {
      name: housingRoomsFilter,
      filterFunction: filterPinsByRooms
    },
    {
      name: housingGuestsFilter,
      filterFunction: filterPinsByGuests
    },
  ];

  Filters.forEach((obj) => {
    const selectValue = obj.name.value;
    if (selectValue !== `any`) {
      obj.filterFunction(selectValue);
    }
  });

  window.map.getPinMap(pins);
};

mapFilters.addEventListener(`change`, window.debounce(getFilterData));

const resetFilters = () => {
  mapFilters.querySelectorAll(`select`).forEach((select) => {
    select.value = `any`;
  });
  housingFeaturesList.forEach((element) => {
    element.checked = false;
  });
};

window.filter = {
  resetFilters
};
