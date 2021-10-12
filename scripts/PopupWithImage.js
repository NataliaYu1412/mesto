import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(imageSrc, imageDescription, popupSelector) {
        super(popupSelector);
        this._imageSrc = imageSrc;
        this._imageDescription = imageDescription;
    }

    _insertFullImage() {
        const fullImage = this._popup.querySelector('.elements__photo');
        const fullimageDescription = this._popup.querySelector('.popup__text');
        fullImage.src = this._imageSrc;
        fullImage.alt = this._imageDescription;
        fullimageDescription.textContent = this._imageDescription;
    }

    open() {
        this._insertFullImage();
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }
}