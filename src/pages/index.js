import {cardsTemplate} from '../utils/components.js';
import {cardsContainer} from '../utils/components.js';
import {formEditProfile} from '../utils/components.js';
import {formNewCard} from '../utils/components.js';
import {profileEditButton} from '../utils/components.js';
import {profileName} from '../utils/components.js';
import {profileStatus} from '../utils/components.js';
import {editPopupName} from '../utils/components.js';
import {editPopupStatus} from '../utils/components.js';
import {profileAddButton} from '../utils/components.js';

import './index.css';

import Section from '../components/Section.js';
import {Card} from '../components/Сard.js';
import {config, FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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
popupWithImage.setEventListeners();

/* Инициализация карточек */

const section = new Section({
  items: initialCards,
  renderer: (card) => {
    const newCard = createNewCard(card);
    cardsContainer.append(newCard);
  }
}, '.elements');
section.render()

function createNewCard(card) {
  const newCard = new Card(cardsTemplate, card, (src, name) => popupWithImage.open(src,name));
  return newCard.createCard();
}

/* Активация валидации для каждой формы */

const cratedFormEditProfile = new FormValidator(config, formEditProfile);
cratedFormEditProfile.enableValidation();

const createdFormNewCard = new FormValidator(config, formNewCard);
createdFormNewCard.enableValidation();

/* Отправка формы имени и статуса, отдельные функции для открытия и закрытия первого попапа */

const userInfo = new UserInfo ({
  name: profileName,
  status: profileStatus
})

function openEditPopup() {
  const userData = userInfo.getUserInfo()
  editPopupName.value = userData.name;
  editPopupStatus.value = userData.status;
  editPopupForm.open()
}

const editPopupForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)}
  });

editPopupForm.setEventListeners();

profileEditButton.addEventListener('click', openEditPopup);

/* Открывание и закрываниe попапа добавления карточки */

const addPopupForm = new PopupWithForm({
  popupSelector: '.popup_type_new-card', 
  handleFormSubmit: saveAddPopupChanges
  });
addPopupForm.setEventListeners();

profileAddButton.addEventListener('click', () => addPopupForm.open(), createdFormNewCard.toggleButtonState());

function saveAddPopupChanges({formName, formLink}) {
  cardsContainer.prepend(createNewCard({name: formName, link: formLink}));
}

