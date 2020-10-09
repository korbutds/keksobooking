'use strict';
(() => {

  const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

  const createFeatureItem = (card, featuresArray) => {
    const popupFeature = card.querySelector(`.popup__features`);
    const featuresList = document.createDocumentFragment();
    for (let i = 0; i < featuresArray.length; i++) {
      const element = document.createElement(`li`);
      element.classList.add(`popup__feature`);
      element.classList.add(`popup__feature--${featuresArray[i]}`);
      featuresList.appendChild(element);
    }
    popupFeature.innerHTML = ``;
    popupFeature.appendChild(featuresList);
  };

  const createAdPhotos = (card, photoArray) => {
    const popupPhotos = card.querySelector(`.popup__photos`);
    const emptyImg = popupPhotos.querySelector(`img`).cloneNode(true);
    popupPhotos.innerHTML = ``;

    for (let j = 0; j < photoArray.length; j++) {
      const newPhoto = emptyImg.cloneNode(true);
      newPhoto.src = photoArray[j];
      popupPhotos.appendChild(newPhoto);
    }
  };

  const createAdCard = (ad) => {
    const cardFragment = document.createDocumentFragment();
    const newCard = cardPopupTemplate.cloneNode(true);
    newCard.querySelector(`.popup__title`).textContent = ad.offer.title;
    newCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    newCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
    newCard.querySelector(`.popup__type`).textContent = ad.offer.type;
    newCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнат для ${ad.offer.guests} гостей`;
    newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}`;
    newCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
    createFeatureItem(newCard, ad.offer.features);
    createAdPhotos(newCard, ad.offer.photos);
    cardFragment.appendChild(newCard);

    return cardFragment;
  };


  window.card = {
    getAdCard: createAdCard
  };
})();
