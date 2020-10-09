'use strict';
(() => {
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = (array) => {
    return array[getRandom(0, array.length - 1)];
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

  const letTransformElement = (element, modal = element) => {

    element.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let moveFlag = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        moveFlag = true;

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        modal.style.top = `${modal.offsetTop - shift.y}px`;
        modal.style.left = `${modal.offsetLeft - shift.x}px`;
        window.data.addressInput.value = `${Math.round(modal.offsetLeft)}, ${Math.round(modal.offsetTop)}`;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (moveFlag) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            element.removeEventListener(`click`, onClickPreventDefault);
          };
          element.addEventListener(`click`, onClickPreventDefault);
        }
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.util = {
    getRandomIntInclusive: getRandom,
    getRandomArrayElement: getRandomElement,
    getDisabledElements: disabledElements,
    getUnDisabledElements: unDisabledElements,
    getElementMove: letTransformElement
  };
})();
