'use strict';

window.data = {};
window.data.getServerData = (data) => {
  window.data.serverData = data.filter((pin) => pin.offer);
};
window.server.load(window.data.getServerData, window.error.errorUploadOn);

