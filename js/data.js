'use strict';

window.data = {};
window.data.getServerData = (pins) => {
  window.data.serverData = pins.slice();
};
window.server.load(window.data.getServerData, window.errorMessage);

