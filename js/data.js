'use strict';

window.data = {};
window.data.getServerData = (pins) => {
  window.data.serverData = pins.filter((pin) => {
    return pin.offer.length !== 0;
  });
};
window.server.load(window.data.getServerData, window.errorMessage);

