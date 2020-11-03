'use strict';

const avatorPreview = document.querySelector(`.ad-form-header__preview`);
const adPicPreview = document.querySelector(`.ad-form__photo`);
const PIC_TYPES = [`jpg`, `jpeg`, `png`];
const PreviewImageStyles = {
  WIDTH: `70px`,
  HEIGHT: `70px`,
  BORDER_RADIUS: `5px`
};

const previewDict = {
  'avatar': avatorPreview,
  'images': adPicPreview
};

window.addPreviewImage = (evt) => {
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
      img.style.width = PreviewImageStyles.WIDTH;
      img.style.height = PreviewImageStyles.HEIGHT;
      img.style.borderRadius = PreviewImageStyles.BORDER_RADIUS;
      previewDict[evt.target.id].appendChild(img);
    });
    reader.readAsDataURL(file);
  }

};
