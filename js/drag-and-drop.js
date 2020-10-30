'use strict';


const letTransformElement = (element, limits, modal = element) => {
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`#address`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapPinMain = mapPins.querySelector(`.map__pin--main`);
  const PIN_WIDTH = mapPinMain.offsetWidth;
  const PIN_HEIGHT = mapPinMain.offsetHeight;
  const PIN_TAIL_HEIGHT = 22;


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

      if (modal.offsetTop < limits.top) {
        modal.style.top = `${limits.top}px`;
      } else if (modal.offsetTop > limits.bottom) {
        modal.style.top = `${limits.bottom}px`;
      } else if (modal.offsetLeft < limits.left) {
        modal.style.left = `${limits.left}px`;
      } else if (modal.offsetLeft > limits.right) {
        modal.style.left = `${limits.right}px`;
      }

      addressInput.value = `${Math.round(modal.offsetLeft + PIN_WIDTH / 2)}, ${Math.round(modal.offsetTop + PIN_HEIGHT + PIN_TAIL_HEIGHT)}`;
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

window.dragAndDrop = {
  getTransformElement: letTransformElement
};
