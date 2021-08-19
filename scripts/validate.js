

/* Валидация форм */

const config = {
  formSelector: '.form',
  inputSelector: '.form__info',
  buttonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  inputErrorClass: 'form__info_type_error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  };
  
  
  const checkInputValidity = (formElement, inputElement, config) => {
    const isInputNotValid = !inputElement.validity.valid;
  
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
  
      showInputError(formElement, inputElement, errorMessage, config)
    } else {
      hideInputError(formElement, inputElement, config)
    }
  };
  
  
  const toggleButtonState = (inputList, buttonElement, config) => {
    const hasNotValidInput = inputList.some(
      inputElement => !inputElement.validity.valid
      );
  
      if (hasNotValidInput) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(config.inactiveButtonClass);
      } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(config.inactiveButtonClass);
      }
  };
  
  
  const setEventListeners = (formElement, config) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.buttonSelector);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      })
    })
  
   toggleButtonState(inputList, buttonElement, config);
  };
  
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners (formElement, config);
    })
  };  
  
  enableValidation(config);