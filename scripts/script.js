import { Card } from './Card.js';
import { config, FormValidator} from './FormValidator.js';

/* Общие функции для открытия и закрытия попапов */

function openPopup(popup) {
  popup.classList.add('popup-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup-opened');
}

/* Переменные */

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit-profile');
const closePopupEditButton= document.querySelector('.popup__button-close_type_edit-profile');
const editForm = document.querySelector('.form_type_edit-profile');

const profileName = document.querySelector('.profile__name');
const editPopupName = document.getElementById('edit-popup-name');
const profileStatus = document.querySelector('.profile__role');
const editPopupStatus = document.getElementById('edit-popup-status');

const cardTemplate = document.querySelector('.elements-template');

addEventListeners ();

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

  
function addEventListeners() {
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClickOnOverlay);
}

/* Реализация добавления карточки */

const saveAddPopup = document.querySelector('.form_type_new-card');
const addPopupName = document.getElementById('add-popup-name');
const addPopupLink = document.getElementById('add-popup-link');

function saveAddPopupChanges (submit) {
  submit.preventDefault();
  
  const name = addPopupName.value;
  const link = addPopupLink.value;

  const newCard = new Card(cardTemplate, {name,link});
  newCard.init(false);
  
  closeAddPopup();
}

/* Открывание и закрываниe попапа добавления карточки */

const addPopup = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const addPopupButtonClose = document.querySelector('.popup__button-close_type_new-card');
const addForm = document.querySelector('.form_type_new-card');

function openAddPopup () {
  openPopup(addPopup);
  
  addForm.reset();

  const inputList = Array.from(document.querySelectorAll('.form__info'))
  const buttonElement = document.querySelector('.form__button-save_type_new-card')
  
  toggleButtonState(inputList, buttonElement, config);

}

function closeAddPopup () {
  closePopup(addPopup);
}

profileAddButton.addEventListener('click', openAddPopup);
addPopupButtonClose.addEventListener('click', closeAddPopup);

saveAddPopup.addEventListener('submit', saveAddPopupChanges);

/* Открывание и закрывание попапа с картинкой */

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupButtonClose = document.querySelector('.popup__button-close_type_image');

function closeCardImage () {
  closePopup(imagePopup);
};

imagePopupButtonClose.addEventListener('click', closeCardImage);

/* Закрытие попапа нажатием клавишы esc */

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup-opened');
    closePopup(openedPopup); 
  }
};

/* Закрытие попапа нажатием на overlay */

function closeByClickOnOverlay(event) {
  if (event.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup-opened');
    closePopup(openedPopup); 
  }
};
