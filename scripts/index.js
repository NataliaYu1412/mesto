import { Card } from './Сard.js';
import { config, FormValidator} from './FormValidator.js';

/* Массив карточек */

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


/* Инициализация карточек */

const cardsTemplate = document.querySelector('.elements-template');
const cardsContainer = document.querySelector('.elements');

const [card1, card2, card3, card4, card5, card6] = initialCards.map((initialCard) => {
  const card = new Card(cardsTemplate, initialCard, openPopup); 
  return card.createCard();
});

cardsContainer.append(card1, card2, card3, card4, card5, card6);

/* Активация валидации для каждой формы */

const formEditProfile = document.querySelector('.form_type_edit-profile');
const cratedFormEditProfile = new FormValidator(config, formEditProfile);
cratedFormEditProfile.enableValidation();

export const formNewCard = document.querySelector('.form_type_new-card');
const createdFormNewCard = new FormValidator(config, formNewCard);
createdFormNewCard.enableValidation();

/* Общие функции для открытия и закрытия попапов */

function openPopup(popup) {
  popup.classList.add('popup-opened');
  
  addEventListeners();
}

function closePopup(popup) {
  popup.classList.remove('popup-opened');

  removeEventListeners()
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

function removeEventListeners() {
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByClickOnOverlay);
}

/* Реализация добавления карточки */

const saveAddPopup = document.querySelector('.form_type_new-card');
const addPopupName = document.getElementById('add-popup-name');
const addPopupLink = document.getElementById('add-popup-link');

function saveAddPopupChanges (submit) {
  submit.preventDefault();
  
  const name = addPopupName.value;
  const link = addPopupLink.value;

  const newCard = new Card(cardsTemplate, {name,link}, openPopup);
  cardsContainer.prepend(newCard.createCard());
  
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

  createdFormNewCard.toggleButtonState();

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
    closePopup(event.target);
  }
};