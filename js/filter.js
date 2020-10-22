'use strict';

(() => {
  // const mapFilterData = [
  //   {
  //     selectId: `housing-type`,
  //     values: [`any`, `palace`, `flat`, `house`, `bungalow`]
  //   },
  //   {
  //     selectId: `housing-price`
  //   },
  //   {
  //     selectId: `housing-rooms`
  //   },
  //   {
  //     selectId: `housing-guests`
  //   }
  // ];

  const mapFilters = document.querySelector(`.map__filters`);
  const f = () => {
    console.log(`Средний ценовой`);
  };
  const selectObject = {
    'housing-type': {
      palace: `palace obj`,
      flat: `flat obj`,
      house: `house obj`,
      bungalow: `bungalow obj`
    },
    'housing-price': {
      middle: () => {
        console.log(`Средний ценовой`);
      },
      low: () => {
        console.log(`Низкий ценовой`);
      },
      high: () => {
        console.log(`Высокий ценовой`);
      }
    },
    'housing-rooms': {
      1: f,
      2: f,
      3: f
    },
    'housing-guests': {
      2: f,
      1: f,
      0: f
    }
  };

  const changeFunction = (evt) => {
    // let pins = window.data.serverData.slice();
    window.pin.getRemovePopup();
    selectObject[evt.target.id][evt.target.value]();
  };

  mapFilters.addEventListener(`change`, changeFunction);
  // mapFilters.addEventListener(`change`, (evt) => {
  //   let pins = window.data.serverData.slice();
  //   window.pin.getRemovePopup();
  //   console.log(selectObject[evt.target.id][evt.target.value]);
  //   if (evt.target.id === `housing-type`) {
  //     if (evt.target.value !== `any`) {
  //       window.pin.getRemovePins();

  //       const sortedPins = pins.filter((pin) => {
  //         return pin.offer.type === evt.target.value;
  //       });

  //       window.map.getPinMap(sortedPins);
  //     } else {
  //       window.pin.getRemovePins();
  //       window.map.getPinMap(pins);
  //     }
  //   }
  // else if (evt.target.id === `housing-price`) {
  //   console.log(pins);
  //   console.log(evt.target.value);

  //   if (evt.target.value === `middle`) {
  //     window.pin.getRemovePins();
  //     const sortedPins = pins.filter((pin) => {
  //       return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
  //     });

  //     window.map.getPinMap(sortedPins);
  //   }
  // }

  // });


  // const sortedCb = (pins) => {
  //   window.data.serverData.filter((pin) => {
  //     return console.log(pin);
  //   })
  //   window.map.getPinFragment(pins)
  //   window.pin.getRemovePopup();
  //   window.pin.getUnactivatePin();
  // }
})();
