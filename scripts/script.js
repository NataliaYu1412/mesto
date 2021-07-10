/* Задание четвертого спринта */

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit-profile');
const closePopupEditButton= document.querySelector('.popup__button-close_type_edit-profile');
const editForm = document.querySelector('.form_type_edit-profile');

const profileName = document.querySelector('.profile__name');
const editPopupName = document.getElementById('edit-popup__name');
const profileStatus = document.querySelector('.profile__role');
const editPopupStatus = document.getElementById('edit-popup__status');


/* Общие функции для открытия и закрытия попапов */

function openPopup(popup) {
  popup.classList.add('popup-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup-opened');
}

/* Отпрака формы имени и статуса, отдельные функции для открытия и закрытия первого попапа */

function openEditPopup () {
  editPopupName.value = profileName.textContent;
  editPopupStatus.value = profileStatus.textContent; 
  openPopup(editPopup);
}

function closeEditPopup () {
  closePopup(editPopup);
}

function saveEditPopupChanges (submit) {
    submit.preventDefault();
    profileName.textContent = editPopupName.value;
    profileStatus.textContent = editPopupStatus.value;
    closeEditPopup();

}

profileEditButton.addEventListener('click', openEditPopup);
closePopupEditButton.addEventListener('click', closeEditPopup);
editForm.addEventListener('submit', saveEditPopupChanges);

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
    elementsCard.querySelector('.elements__delete').addEventListener('click', deleteCard);
    elementsCard.querySelector('.elements__button').addEventListener('click', likeCard);
    elementsCard.querySelector('.elements__photo').addEventListener('click', openCardImage);
}

function deleteCard (event) {
  const elementsCard = event.target.closest('.elements__card');
  elementsCard.remove();
}

function likeCard (event) {
  event.target.classList.toggle('elements__button_liked');
}

initialCards.forEach(function (element) {
   const name = element.name;
   const link = element.link;

   const elementsCard = createCardElement(name, link);

   placeElements.append(elementsCard);
  
})


/* Реализация добавления карточки */

const saveAddPopup = document.querySelector('.form_type_new-card');
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

/* Открывание и закрывания попапа добавления карточки */

const addPopup = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const addPopupButtonClose = document.querySelector('.popup__button-close_type_new-card');
const addForm = document.querySelector('.form_type_new-card');

function openAddPopup () {
  openPopup(addPopup);
  addForm.reset();
}

function closeAddPopup () {
  closePopup(addPopup);
}

profileAddButton.addEventListener('click', openAddPopup);
addPopupButtonClose.addEventListener('click', closeAddPopup);

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

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupButtonClose = document.querySelector('.popup__button-close_type_image');

function openCardImage(event) {
  const link = event.target.src;
  const name = event.target.alt;
  
  openPopup(imagePopup);
  
  imagePopup.querySelector('.popup__text').textContent = name;
  imagePopup.querySelector('.popup__image').src = link;
  imagePopup.querySelector('.popup__image').alt = name;
}

function closeCardImage () {
  closePopup(imagePopup);
}

imagePopupButtonClose.addEventListener('click', closeCardImage);