export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup-opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);

    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = (evt) => {
        if(evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
    }
}