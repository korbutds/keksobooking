'use strict';

window.data = {};
const getServerData = (data) => {
  window.data.serverData = data.filter((pin) => pin.offer);
};

const downloadErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.server.load(getServerData, downloadErrorMessage);

