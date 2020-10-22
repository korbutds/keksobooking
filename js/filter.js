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

  mapFilters.addEventListener(`change`, (evt) => {
    let pins = window.data.serverData.slice();
    window.pin.getRemovePopup();
    if (evt.target.id === `housing-type`) {
      if (evt.target.value !== `any`) {
        window.pin.getRemovePins();

        const sortedPins = pins.filter((pin) => {
          return pin.offer.type === evt.target.value;
        });

        window.map.getPinMap(sortedPins);
      } else {
        window.pin.getRemovePins();
        window.map.getPinMap(pins);
      }
    }
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

  });


  // const sortedCb = (pins) => {
  //   window.data.serverData.filter((pin) => {
  //     return console.log(pin);
  //   })
  //   window.map.getPinFragment(pins)
  //   window.pin.getRemovePopup();
  //   window.pin.getUnactivatePin();
  // }
})();
