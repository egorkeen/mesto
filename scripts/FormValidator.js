class FormValidator {

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  };

  _blockForm(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.disabled = true;
  };

  _showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputError);
    errorElement.classList.add(config.activeInputError);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputError);
    errorElement.classList.remove(config.activeInputError);
    errorElement.textContent = '';
  };

  _checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
    else {
      this._hideInputError(formElement, inputElement, config);
    };
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.classList.remove(config.activeButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.classList.add(config.activeButtonClass)
      buttonElement.disabled = false;
    };
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._config);
    this._formElement.addEventListener('submit', () => {this._blockForm(buttonElement, this._config)});
    inputList.forEach((inputElement) => {
      this._checkInputValidity(this._formElement, inputElement, this._config);
      this._toggleButtonState(inputList, buttonElement, this._config);
    });
  };

  enableValidation() {
    this._setEventListeners();
  };
};

export {FormValidator};