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
  const {author: avatar, offer: title, address, price, type, rooms, guests, checkin, checkout} = ad;
  const avatarElement = newCard.querySelector(`.popup__avatar`);
  avatarElement.src = avatar ? avatar : avatarElement.remove();

  const titleElement = newCard.querySelector(`.popup__title`);
  titleElement.textContent = title ? title : titleElement.remove();

  const addressElement = newCard.querySelector(`.popup__text--address`);
  addressElement.textContent = address ? address : addressElement.remove();

  const priceElement = newCard.querySelector(`.popup__text--price`);
  priceElement.textContent = price ? `${price} ₽/ночь` : priceElement.remove();

  const typeElement = newCard.querySelector(`.popup__type`);
  typeElement.textContent = type ? type : typeElement.remove();

  const capacityElement = newCard.querySelector(`.popup__text--capacity`);
  capacityElement.textContent = (rooms && guests) ? `${rooms} комнат для ${guests} гостей` : capacityElement.remove();

  const checkTimeElement = newCard.querySelector(`.popup__text--time`);
  checkTimeElement.textContent = (checkin && checkout) ? `Заезд после ${checkin} выезд до ${checkout}` : checkTimeElement.remove();

  createFeatureItem(newCard, ad.offer.features);
  createAdPhotos(newCard, ad.offer.photos);
  cardFragment.appendChild(newCard);

  return cardFragment;
};


window.card = {
  getAdCard: createAdCard
};
