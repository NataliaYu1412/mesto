export const config = {
    formSelector: '.form',
    inputSelector: '.form__info',
    buttonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__info_type_error',
    errorClass: 'form__input-error_active'
  };

export class FormValidator {
    _formElement;
    _formSelector;
    _inputSelector;
    _inactiveButtonClass;
    _inputErrorClass;
    _errorClass;
    _buttonElement;
    _inputList;

    constructor(config, formElement) {
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._buttonSelector = config.buttonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._buttonElement = this._formElement.querySelector(this._buttonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
        errorElement.textContent = errorMessage;

        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        
    };
    
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
        errorElement.textContent = '';

        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);

    };

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
  
        if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        this._showInputError(inputElement, errorMessage)
        } else {
        this._hideInputError(inputElement)
        }
    };

    _toggleButtonState() {
        const hasNotValidInput = this._inputList.some(
            inputElement => !inputElement.validity.valid
            );
        
            if (hasNotValidInput) {
                this._buttonElement.setAttribute('disabled', true);
                this._buttonElement.classList.add(this._inactiveButtonClass);
            } else {
                this._buttonElement.removeAttribute('disabled');
                this._buttonElement.classList.remove(this._inactiveButtonClass);
            }
        };

    _setEventListeners() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
          });

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => { 
            this._checkInputValidity(inputElement);

            this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners()
    }
    
}