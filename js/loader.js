'use strict';
const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIC_TYPES = [`jpg`, `jpeg`, `png`];

const previewDict = {
  'avatar': avatorPreview,
  'images': adPicPreview
};

window.previewCb = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PIC_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();
    reader.addEventListener(`load`, () => {
      previewDict[evt.target.id].replaceChildren();
      previewDict[evt.target.id].style.display = `flex`;
      previewDict[evt.target.id].style.justifyContent = `center`;
      const img = document.createElement(`img`);
      img.src = reader.result;
      img.alt = `Превью добавленного изображеия`;
      img.style.width = `40px`;
      img.style.height = `44px`;
      img.style.alignSelf = `center`;
      previewDict[evt.target.id].appendChild(img);
    });
    reader.readAsDataURL(file);
  }

};
