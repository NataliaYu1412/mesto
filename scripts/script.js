/* Задание четвертого спринта */

const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup= document.querySelector('.popup__button-close');
const savePopup = document.querySelector('.form');

const profileName = document.querySelector('.profile__name');
const popupName = document.getElementById('popup__name');
const profileStatus = document.querySelector('.profile__role');
const popupStatus = document.getElementById('popup__status');

/* Общие функции для открытия и закрытие попапов */

function activePopup(popup) {
  popup.classList.add('popup-opened');
}

function closePopupForm (popup) {
  popup.classList.remove('popup-opened');
}

/* Отпрака формы имени и статуса, отдельные функции для открытия и закрытия первого попапа */

function activePopupFirst () {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent; 
  activePopup(popup);
}

function closePopupFormFirst () {
  closePopupForm(popup);
}

function savePopupChanges (submit) {
    submit.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopupFormFirst();
}

openPopup.addEventListener('click', activePopupFirst);
closePopup.addEventListener('click', closePopupFormFirst);
savePopup.addEventListener('submit', savePopupChanges);

/* Добавление массива карточек, реализация лайков и удаления карточек */

const elements = document.querySelector('.elements');

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
  
function setEventListeners(elementsCard) {
    elementsCard.querySelector('.elements__delete').addEventListener('click', cardsDelete)
}

function addEventListeners(elementsCard) {
    elementsCard.querySelector('.elements__button').addEventListener('click', cardsLike)
}

initialCards.forEach(function (element) {
    const elementsTemplate = document.querySelector('.elements-template').content;
    const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);

    elementsCard.querySelector('.elements__title').textContent = element.name;
    elementsCard.querySelector('.elements__photo').src = element.link;
    elementsCard.querySelector('.elements__photo').alt = element.name;
    
    setEventListeners(elementsCard);
    addEventListeners(elementsCard);

    elements.append(elementsCard);

});

function cardsDelete (event) {
    const elementsCard = event.target.closest('.elements__card');
    elementsCard.remove();
}

function cardsLike (event) {
   event.target.classList.toggle('elements__button_liked');
}

/* Открывание и закрывания попапа добавления карточки */

const addPopup = document.querySelector('.add-popup');
const openAddPopup = document.querySelector('.profile__add-button');
const closeAddPopup = document.querySelector('.add-popup__button-close');

function activeAddPopup () {
  activePopup(addPopup);
}

function closeAddPopupForm () {
  closePopupForm(addPopup);
}

openAddPopup.addEventListener('click', activeAddPopup);
closeAddPopup.addEventListener('click', closeAddPopupForm);

/* Реализация добавления карточки */

const saveAddPopup = document.querySelector('.add-form');
const addPopupName = document.getElementById('add-popup__name');
const addPopupLink = document.getElementById('add-popup__link');

function saveAddPopupChanges (submit) {

  const elementsTemplate = document.querySelector('.elements-template').content;
  const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  elements.prepend(elementsCard);

  submit.preventDefault();
  elementsCard.querySelector('.elements__title').textContent = addPopupName.value;
  elementsCard.querySelector('.elements__photo').src = addPopupLink.value;

  setEventListeners(elementsCard);
  addEventListeners(elementsCard);
  
  closeAddPopupForm();
}

saveAddPopup.addEventListener('submit', saveAddPopupChanges);
