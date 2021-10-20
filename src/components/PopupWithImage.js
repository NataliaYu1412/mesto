import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(src, name) {
        const fullImage = this._popup.querySelector('.popup__image');
        const fullImageDescription = this._popup.querySelector('.popup__text');
        fullImage.src = src;
        fullImage.alt = name;
        fullImageDescription.textContent = name;

        super.open();
    }
}

