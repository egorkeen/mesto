import { Popup } from './Popup.js';

class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    this._submitButton = this._form.querySelector('.form__submit-button');
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

}

export { PopupWithForm };