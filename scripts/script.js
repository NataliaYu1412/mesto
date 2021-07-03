/* Задание четвертого спринта */

const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupButtonClose= document.querySelector('.popup__button-close');
const form = document.querySelector('.form');

const profileName = document.querySelector('.profile__name');
const popupName = document.getElementById('popup__name');
const profileStatus = document.querySelector('.profile__role');
const popupStatus = document.getElementById('popup__status');

/* Общие функции для открытия и закрытие попапов */

function openPopup(popup) {
  popup.classList.add('popup-opened');
}

function closePopup (popup) {
  popup.classList.remove('popup-opened');
}

/* Отпрака формы имени и статуса, отдельные функции для открытия и закрытия первого попапа */

function openFirstPopup () {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent; 
  openPopup(popup);
}

function closeFirstPopup () {
  closePopup(popup);
}

function saveFirstPopupChanges (submit) {
    submit.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closeFirstPopup();

}

profileEditButton.addEventListener('click', openFirstPopup);
popupButtonClose.addEventListener('click', closeFirstPopup);
form.addEventListener('submit', saveFirstPopupChanges);

/* Добавление массива карточек, реализация лайков и удаления карточек */

const placeElements = document.querySelector('.elements');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
  
function addEventListeners(elementsCard) {
    elementsCard.querySelector('.elements__delete').addEventListener('click', cardsDelete);
    elementsCard.querySelector('.elements__button').addEventListener('click', cardsLike);
    elementsCard.querySelector('.elements__photo').addEventListener('click', openCardImage);
}

function cardsDelete (event) {
  const elementsCard = event.target.closest('.elements__card');
  elementsCard.remove();
}

function cardsLike (event) {
  event.target.classList.toggle('elements__button_liked');
}

initialCards.forEach(function (element) {
   const name = element.name;
   const link = element.link;

   const elementsCard = createCardElement(name, link);

   placeElements.append(elementsCard);
  
})

/* Открывание и закрывания попапа добавления карточки */

const addPopup = document.querySelector('.add-popup');
const profileAddButton = document.querySelector('.profile__add-button');
const addPopupButtonClose = document.querySelector('.add-popup__button-close');

function openAddPopup () {
  openPopup(addPopup);
}

function closeAddPopup () {
  closePopup(addPopup);
}

profileAddButton.addEventListener('click', openAddPopup);
addPopupButtonClose.addEventListener('click', closeAddPopup);

/* Реализация добавления карточки */

const saveAddPopup = document.querySelector('.add-form');
const addPopupName = document.getElementById('add-popup__name');
const addPopupLink = document.getElementById('add-popup__link');

function saveAddPopupChanges (submit) {
  submit.preventDefault();
  
  const name = addPopupName.value;
  const link = addPopupLink.value;

  const elementsCard = createCardElement(name, link);

  placeElements.prepend(elementsCard);
  
  closeAddPopup();

}

saveAddPopup.addEventListener('submit', saveAddPopupChanges);

/* Общая функция добавления новой карточки */

function createCardElement (name, link) {
  const elementsTemplate = document.querySelector('.elements-template').content;
  const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);

  elementsCard.querySelector('.elements__title').textContent = name;
  elementsCard.querySelector('.elements__photo').src = link;
  elementsCard.querySelector('.elements__photo').alt = name;

  addEventListeners(elementsCard);

  return elementsCard;
}

/* Открывание и закрывание попапа с картинкой */

const imagePopup = document.querySelector('.image-popup');
const imagePopupButtonClose = document.querySelector('.image-popup__button-close');

function openCardImage(event) {
  const link = event.target.src;
  const name = event.target.alt;
  
  openPopup(imagePopup);
  
  imagePopup.querySelector('.image-popup__photo').src = link;
  imagePopup.querySelector('.image-popup__text').textContent = name;
}

function closeCardImage () {
  closePopup(imagePopup);
}

imagePopupButtonClose.addEventListener('click', closeCardImage);
