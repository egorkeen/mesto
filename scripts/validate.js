//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputError);
  errorElement.classList.add(config.activeInputError);
  errorElement.textContent = errorMessage;
}

//скрыть ошибку
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.activeInputError);
  errorElement.textContent = '';
};

//проверить валидность инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

//проверять валидность поля и вызвает/убирает ошибку.
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
  else {
    hideInputError(formElement, inputElement, config);
  }
};

//переключать состояние кнопки submit
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add(config.activeButtonClass)
    buttonElement.disabled = false;
  }
};

//создать слушатели на формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//собрать все формы и вызывать функцию
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};