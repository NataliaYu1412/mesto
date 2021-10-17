import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  /*_getInputValues() {
    return [...this._popup.querySelectorAll('input')]
      .map((input) => input.value);
  }*/

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__info');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    return this._formValues;
    });

  }

  /*setEventListeners = () => {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      const formValues = this._getInputValues();
      this._submitCallback(formValues);
      this.close();
    });*/

  setEventListeners = () => {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

  super.setEventListeners();
  }

  close() {
    // reset data of fields
    this._popup.querySelector('.form').reset();
    super.close();
  }
}
