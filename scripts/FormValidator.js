// class FormValidator {

//   constructor(config, formElement) {
//     this._config = config;
//     this._formElement = formElement;
//   };

//   _blockForm() {
//     this._buttonElement.classList.add(this._config.inactiveButtonClass);
//     this._buttonElement.classList.remove(this._config.activeButtonClass);
//     this._buttonElement.disabled = true;
//   };

//   _showInputError(inputElement, errorMessage) {
//     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(this._config.inputError);
//     errorElement.classList.add(this._config.activeInputError);
//     errorElement.textContent = errorMessage;
//   };

//   _hideInputError(inputElement) {
//     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(this._config.inputError);
//     errorElement.classList.remove(this._config.activeInputError);
//     errorElement.textContent = '';
//   };

//   _hasInvalidInput() {
//     return this._inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   };

//   _checkInputValidity(inputElement) {
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     }
//     else {
//       this._hideInputError(inputElement);
//     };
//   };

//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this._buttonElement.classList.add(this._config.inactiveButtonClass);
//       this._buttonElement.classList.remove(this._config.activeButtonClass);
//       this._buttonElement.disabled = true;
//     }
//     else {
//       this._buttonElement.classList.remove(this._config.inactiveButtonClass);
//       this._buttonElement.classList.add(this._config.activeButtonClass)
//       this._buttonElement.disabled = false;
//     };
//   };

//   _setEventListeners() {
//     this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
//     this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
//     this._toggleButtonState();
//     this._formElement.addEventListener('submit', () => {this._blockForm()});
//     this._inputList.forEach((inputElement) => {
//       this._checkInputValidity(inputElement);
//       this._toggleButtonState();
//     });
//   };

//   enableValidation() {
//     this._setEventListeners();
//   };
// };

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

  _blockForm() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.classList.remove(this._activeButtonClass);
    this._submitButton.disabled = true;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.classList.add(this._activeInputError);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._activeInputError);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.classList.remove(this._activeButtonClass);
      this._submitButton.disabled = true;
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.classList.add(this._activeButtonClass);
      this._submitButton.disabled = false;
    }
  };

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

  enableValidation() {
    this._setEventListeners();
  };
};

export { FormValidator };