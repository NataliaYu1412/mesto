export const cardsTemplate = document.querySelector('.elements-template');
export const cardsContainer = document.querySelector('.elements');
export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const formNewCard = document.querySelector('.form_type_new-card');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__role');
export const editPopupName = document.getElementById('edit-popup-name');
export const editPopupStatus = document.getElementById('edit-popup-status');
export const profileAddButton = document.querySelector('.profile__add-button');

import arkhyz from '../images/arkhyz.jpg';
import chelyabinskOblast from '../images/chelyabinsk-oblast.jpg';
import ivanovo from '../images/ivanovo.jpg'
import kamchatka from '../images/kamchatka.jpg'
import kholmogorskyRayon from '../images/kholmogorsky-rayon.jpg'
import baikal from '../images/baikal.jpg'


export const initialCards = [{
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