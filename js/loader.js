'use strict';
const PIC_TYPES = [`jpg`, `jpeg`, `png`];
const avatarLoad = document.querySelector(`#avatar`);
const avatorPreview = document.querySelector(`.ad-form-header__preview`);

const adPicLoad = document.querySelector(`#images`);
const adPicPreview = document.querySelector(`.ad-form__photo`);

window.previewCb = (preview, typesArray) => {
  return (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();

    const matches = typesArray.some((type) => {
      return fileName.endsWith(type);
    });

    if (matches) {
      let reader = new FileReader();
      reader.addEventListener(`load`, () => {
        preview.replaceChildren();
        preview.style.display = `flex`;
        preview.style.justifyContent = `center`;
        const img = document.createElement(`img`);
        img.src = reader.result;
        img.alt = `Превью добавленного изображеия`;
        img.style.width = `40px`;
        img.style.height = `44px`;
        img.style.alignSelf = `center`;
        img.style.alignSelf = `center`;
        preview.appendChild(img);
      });
      reader.readAsDataURL(file);
    }

  };
};


// fotoCb(evt, avatorPreview, PIC_TYPES);
avatarLoad.addEventListener(`change`, window.previewCb(avatorPreview, PIC_TYPES));
adPicLoad.addEventListener(`change`, window.previewCb(adPicPreview, PIC_TYPES));

// avatarLoad.addEventListener(`change`, (evt) => {
//   const file = evt.target.files[0];
//   const fileName = file.name.toLowerCase();

//   const matches = PIC_TYPES.some((type) => {
//     return fileName.endsWith(type);
//   });

//   if (matches) {
//     let reader = new FileReader();

//     reader.addEventListener(`load`, () => {
//       avatorPreview.src = reader.result;
//     });
//     reader.readAsDataURL(file);
//   }
// });

// adPicLoad.addEventListener(`change`, () => {
//   const file = adPicLoad.files[0];
//   const fileName = file.name.toLowerCase();
//   const matches = PIC_TYPES.some((type) => {
//     return fileName.endsWith(type);
//   });

//   if (matches) {
//     let reader = new FileReader();

//     reader.addEventListener(`load`, () => {
//       const img = document.createElement(`img`);
//       img.src = reader.result;
//       img.alt = `Изображение объявления`;
//       img.style.width = `70px`;
//       img.style.height = `70px`;
//       adPicPreview.appendChild(img);
//     });
//     reader.readAsDataURL(file);
//   }
// });


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
