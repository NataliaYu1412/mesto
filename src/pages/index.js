import './index.css';

import Section from '../components/Section.js';
import {Card} from '../components/Сard.js';
import {config, FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import arkhyz from '../images/arkhyz.jpg';
import chelyabinskOblast from '../images/chelyabinsk-oblast.jpg';
import ivanovo from '../images/ivanovo.jpg'
import kamchatka from '../images/kamchatka.jpg'
import kholmogorskyRayon from '../images/kholmogorsky-rayon.jpg'
import baikal from '../images/baikal.jpg'


/* Массив карточек */

const initialCards = [{
    name: 'Архыз',
    link: arkhyz
},
  {
    name: 'Челябинская область',
    link: chelyabinskOblast
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskyRayon
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

/* Popup изображений */

const popupWithImage = new PopupWithImage('.popup_type_image');

/* Инициализация карточек */

const cardsTemplate = document.querySelector('.elements-template');
const cardsContainer = document.querySelector('.elements');
const section = new Section({
  items: initialCards,
  renderer: (card) => {
    const newCard = createNewCard(card);
    cardsContainer.append(newCard);
  }
}, '.elements');
section.render()

function createNewCard(card) {
  const newCard = new Card(cardsTemplate, card, popupWithImage.open);
  return newCard.createCard();
}

/* Активация валидации для каждой формы */

const formEditProfile = document.querySelector('.form_type_edit-profile');
const cratedFormEditProfile = new FormValidator(config, formEditProfile);
cratedFormEditProfile.enableValidation();

export const formNewCard = document.querySelector('.form_type_new-card');
const createdFormNewCard = new FormValidator(config, formNewCard);
createdFormNewCard.enableValidation();

/* Переменные */

const profileEditButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__role');
const editPopupName = document.getElementById('edit-popup-name');
const editPopupStatus = document.getElementById('edit-popup-status');

/* Отправка формы имени и статуса, отдельные функции для открытия и закрытия первого попапа */

const editPopupClass = new PopupWithForm('.popup_type_edit-profile', saveEditPopupChanges);
editPopupClass.setEventListeners();

profileEditButton.addEventListener('click', openEditPopup);

function openEditPopup() {
  editPopupName.value = profileName.textContent;
  editPopupStatus.value = profileStatus.textContent;
  editPopupClass.open()
}

function saveEditPopupChanges (name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}

/* Открывание и закрываниe попапа добавления карточки */

const profileAddButton = document.querySelector('.profile__add-button');

const addPopupClass = new PopupWithForm('.popup_type_new-card', saveAddPopupChanges);
addPopupClass.setEventListeners();

profileAddButton.addEventListener('click', () => addPopupClass.open());
createdFormNewCard.toggleButtonState();

function saveAddPopupChanges(name, link) {
  cardsContainer.prepend(createNewCard({name, link}));
}
