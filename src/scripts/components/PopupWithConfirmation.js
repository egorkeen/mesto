import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmitDelete) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
    this._form = this._popup.querySelector('.form');
    this.submitButton = this._form.querySelector('.form__submit-button');
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitDelete(this._card, this._cardId);
      super.close();
    });
  };
};

export { PopupWithConfirmation };