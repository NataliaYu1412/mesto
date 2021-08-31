const imagePopup = document.querySelector('.popup_type_image'); 
const imagePopupPhoto = imagePopup.querySelector('.popup__image'); 
const imagePopupName = imagePopup.querySelector('.popup__text'); 
 
export class Card { 
    _name; 
    _src; 
    _templateSelector; 
    _card; 
    _openPopup; 
 
    constructor(templateSelector, data, openPopup) { 
        this._name = data.name; 
        this._src = data.link; 
        this._templateSelector = templateSelector; 
        this._openPopup = openPopup; 
    } 
 
    createCard() { 
        this._card = this._createCardElement(); 
        this._addEventListeners(); 
 
        return this._card; 
    } 
 
    /* Добавление новой карточки */  
 
    _createCardElement() { 
        const elementsTemplate = this._templateSelector.content; 
        const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true); 
 
        const elementsPhoto = elementsCard.querySelector('.elements__photo'); 
 
        elementsCard.querySelector('.elements__title').textContent = this._name; 
        elementsPhoto.src = this._src; 
        elementsPhoto.alt = this._name; 
 
        return elementsCard; 
    } 
 
    /* Навешивание слушателей */  
 
    _addEventListeners () { 
        this._card.querySelector('.elements__delete').addEventListener('click', () => this._handleDelete()); 
        this._card.querySelector('.elements__button').addEventListener('click', (event) => this._handleLike(event)); 
        this._card.querySelector('.elements__photo').addEventListener('click', () => this._handleOpenDetails()); 
    } 
 
    /* Удаление карточки */ 
 
    _handleDelete() { 
        this._card.remove(); 
    } 
 
    /* Обработка клика по лайку */ 
 
    _handleLike(event) { 
        event.target.classList.toggle('elements__button_liked'); 
    } 
 
    /* Открытие попапа с картинкой карточки */ 
 
    _handleOpenDetails() { 
        this._openPopup(imagePopup); 
 
        imagePopupName.textContent = this._name; 
        imagePopupPhoto.src = this._src; 
        imagePopupPhoto.alt = this._name;     
    } 
} 