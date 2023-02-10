//класс валидации формы
class FormValidator {

  constructor (config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputError = config.inputError;
    this._activeInputError = config.activeInputError;
    this._submitButtonSelector = config.submitButtonSelector;
    this._activeButtonClass = config.activeButtonClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formElement = formElement;
  };

  //блокировать кнопку подтверждения
  _blockForm() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.classList.remove(this._activeButtonClass);
    this._submitButton.disabled = true;
  }

  //отобразить ошибку у инпута
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.classList.add(this._activeInputError);
    errorElement.textContent = errorMessage;
  }

  //скрыть ошибку у инпута
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._activeInputError);
    errorElement.textContent = '';
  }

  //проверить валидность инпута и отобразить/скрыть ошибку
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    };
  };

  //проверить все инпуты на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //переключить состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._blockForm();
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.classList.add(this._activeButtonClass);
      this._submitButton.disabled = false;
    }
  };

  //установить слушатели
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._formElement.addEventListener('submit', () => {this._blockForm()})
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //активировать валидацию
  enableValidation() {
    this._setEventListeners();
  };
};

export { FormValidator };