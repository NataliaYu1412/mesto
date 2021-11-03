export class PopupWithConfirm extends Popup {
    constructor({ popupSelector, apiDeleteCard}) {
        super(popupSelector);
        this._apiDeleteCard = apiDeleteCard
    }
    setEventListeners() {
        this._popupFormWithConfirm = this._popup.querySelector('.popup__type_confirm');
        this._popupFormWithConfirm.addEventListener('submit', (evt) => {
            this._apiDeleteCard;
        })
        super.setEventListeners();
    }
}