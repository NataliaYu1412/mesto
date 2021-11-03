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
import {initialCards} from '../utils/components.js';

import './index.css';

import Section from '../components/Section.js';
import {Card} from '../components/Сard.js';
import {config, FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

/* Работа с Api */

export const userId = null;
export const cardId = null;

const api = new Api ({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    "Content-type": 'application/json',
    authorization: 'd0c1307e-6920-4db6-8646-78b2e72902b6',
  }
});

api.getAllCards()
  .then((data) => {
      const section = new Section({
          items: data,
          renderer: (card) => {
              const newCard = createNewCard(card);
              cardsContainer.append(newCard);
          }
      }, '.elements');
      section.render();
      cardId = data._id;
  })
  .catch((err) => alert(err));

api
  .getProfile()
  .then((response) => {
      userInfo.setUserInfo({name: response.name, status: response.about});
      userId = response._id;
  });

/* Popup изображений */

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function deleteCard(id) {
    return api.deleteCard(id);
};

function createNewCard(card) {
  const newCard = new Card(
    {
        name: card.name,
        link: card.link,
        id: card._id,
        likes: card.likes,
        handleCardClick: (src, name) => popupWithImage.open(src,name),
        handleDeleteClick: (id) => deleteCard(id),
        handleLikeClick: (src, name) => popupWithImage.open(src,name),
    },
    cardsTemplate
  );

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
    api
      .patchProfile(formData.name, formData.status)
      .then((response) => {
          userInfo.setUserInfo({name: response.name, status: response.about});
      })
    }
  });

editPopupForm.setEventListeners();

profileEditButton.addEventListener('click', openEditPopup);

/* Открывание и закрываниe попапа добавления карточки */

const addPopupForm = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: saveAddPopupChanges
  });
addPopupForm.setEventListeners();

profileAddButton.addEventListener('click', () => {
  addPopupForm.open()
  createdFormNewCard.toggleButtonState()
});

function saveAddPopupChanges({addFormName, addFormLink}) {
  api
    .createCard(addFormName, addFormLink)
    .then((responseCard) => {
      const addedCard = {
        name: responseCard.name,
        link: responseCard.link
      }
      cardsContainer.prepend(createNewCard(addedCard));
    })
}

/* Открывание и закрываниe попапа подтверждения удаления карточки */

