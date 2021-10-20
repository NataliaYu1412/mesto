import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners = () => {
    this._popup.querySelector('.form').addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

  super.setEventListeners();
  }
  
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__info');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
    
  }

  close() {
    // reset data of fields
    this._popup.querySelector('.form').reset();
    super.close();
  }
}
