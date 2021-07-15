/*Валидация форм*/

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
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
        buttonElement.classList.add(inactiveButtonClass);
      } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
      }
  }
  
  const setEventListeners = (formElement) => {
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
  
  
  const enableValidation = ({formSelector, inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners (formElement, inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    })
  };  
  
  enableValidation({
    formSelector:'.form',
    inputSelector:'.form__info',
    buttonSelector:'.form__button-save',
    inactiveButtonClass:'form__button-save_inactive',
    inputErrorClass:'form__info_type_error',
    errorClass:'form__input-error_active'
  });