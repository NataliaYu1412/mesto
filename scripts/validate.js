/* Валидация форм */

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
    inputElement.classList.add('form__info_type_error');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
    inputElement.classList.remove('form__info_type_error');
  };
  
  
  const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
  
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
  
      showInputError(formElement, inputElement, errorMessage)
    } else {
      hideInputError(formElement, inputElement)
    }
  };
  
  
  const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(
      inputElement => !inputElement.validity.valid
      );
  
      if (hasNotValidInput) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('form__button-save_inactive');
      } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__button-save_inactive');
      }
  };
  
  
  const setEventListeners = (formElement, inputSelector, buttonSelector) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(buttonSelector);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  
   toggleButtonState(inputList, buttonElement);
  };
  
  
  const enableValidation = ({formSelector, inputSelector, buttonSelector}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners (formElement, inputSelector, buttonSelector);
    })
  };  
  
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__info',
    buttonSelector: '.form__button-save',
  });

  const config = {
    formSelector: '.form',
    inputSelector: '.form__info',
    buttonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__info_type_error',
    errorClass: 'form__input-error_active'
  };