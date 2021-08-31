/* export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup-opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListeners('keydown', this._handleEscClose);

    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.close();
        }
    }
    

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        });
    }
} */