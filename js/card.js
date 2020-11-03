'use strict';

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

  const avatar = newCard.querySelector(`.popup__avatar`);
  avatar.src = ad.author.avatar ? ad.author.avatar : ad.remove();

  const title = newCard.querySelector(`.popup__title`);
  title.textContent = ad.offer.title ? ad.offer.title : title.remove();

  const address = newCard.querySelector(`.popup__text--address`);
  address.textContent = ad.offer.address ? ad.offer.address : address.remove();

  const price = newCard.querySelector(`.popup__text--price`);
  price.textContent = ad.offer.price ? `${ad.offer.price} ₽/ночь` : price.remove();

  const type = newCard.querySelector(`.popup__type`);
  type.textContent = ad.offer.type ? ad.offer.type : type.remove();

  const capacity = newCard.querySelector(`.popup__text--capacity`);
  capacity.textContent = (ad.offer.rooms && ad.offer.guests) ? `${ad.offer.rooms} комнат для ${ad.offer.guests} гостей` : capacity.remove();

  const checkTime = newCard.querySelector(`.popup__text--time`);
  checkTime.textContent = (ad.offer.checkin && ad.offer.checkout) ? `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}` : checkTime.remove();

  createFeatureItem(newCard, ad.offer.features);
  createAdPhotos(newCard, ad.offer.photos);
  cardFragment.appendChild(newCard);

  return cardFragment;
};


window.card = {
  getAdCard: createAdCard
};
