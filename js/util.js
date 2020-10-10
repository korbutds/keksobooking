'use strict';
(() => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = (array) => {
    return array[getRandomNumber(0, array.length - 1)];
  };

  const disabledElements = (disabledArray) => {
    for (const element of disabledArray) {
      element.disabled = true;
    }
  };

  const unDisabledElements = (undisabledArray) => {
    for (const element of undisabledArray) {
      element.disabled = false;
    }
  };

  window.util = {
    getRandomIntInclusive: getRandomNumber,
    getRandomArrayElement: getRandomElement,
    getDisabledElements: disabledElements,
    getUnDisabledElements: unDisabledElements
  };
})();
