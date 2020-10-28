'use strict';
const PIC_TYPES = [`jpg`, `jpeg`, `png`];
const avatarLoad = document.querySelector(`#avatar`);
const avatorPreview = document.querySelector(`.ad-form-header__preview img`);

const adPicLoad = document.querySelector(`#images`);
const adPicPreview = document.querySelector(`.ad-form__photo`);

avatarLoad.addEventListener(`change`, () => {
  const file = avatarLoad.files[0];
  const fileName = file.name.toLowerCase();

  const matches = PIC_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatorPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

adPicLoad.addEventListener(`change`, () => {
  const file = adPicLoad.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PIC_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const img = document.createElement(`img`);
      img.src = reader.result;
      img.alt = `Изображение объявления`;
      img.style.width = `70px`;
      img.style.height = `70px`;
      adPicPreview.appendChild(img);
    });
    reader.readAsDataURL(file);
  }
});


// const uploadSection = document.querySelector(`.upload`);
// const avatorImage = uploadSection.querySelector(`.setup-user-pic`);
// const inputAvator = uploadSection.querySelector(`input[type=file]`);

// inputAvator.addEventListener(`change`, () => {
//   const file = inputAvator.files[0];
//   const fileName = file.name.toLowerCase();
//   const matches = FILE_TYPES.some((type) =>{
//     return fileName.endsWith(type);
//   });

//   if (matches) {
//     let reader = new FileReader();

//     reader.addEventListener(`load`, () => {
//       avatorImage.src = reader.result;
//     });

//     reader.readAsDataURL(file);
//   }
// });
