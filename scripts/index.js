import {Card} from './Card.js';
import {config, FormValidator} from  './FormValidator.js'
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

const cardTemplate = document.querySelector('.elements-template');

const [card1, card2, card3, card4, card5, card6] = initialCards.map((card) => {
    return new Card(cardTemplate, card);
});

card1.init();
card2.init();
card3.init();
card4.init();
card5.init();
card6.init();

/* Активация валидации для каждой формы */

const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((formElement) => {
  const validationTurnedOn = new FormValidator(config, formElement);

  validationTurnedOn.enableValidation();

})