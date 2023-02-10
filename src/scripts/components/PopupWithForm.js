import { Popup } from './Popup.js';

class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupSelector.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });

    return this._inputValues;
  }

  close() {
    super.close();

    this._inputList.forEach((inputElement) => {
      inputElement.textContent = '';
    });
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (event) => {
      if (event.target === this._popupSelector) {
        this.close();
      };
    });



    this._closeButton.addEventListener('click', () => { this.close() });

    this._form.addEventListener('submit', this._handleSubmitForm );
  }

}

export { PopupWithForm };