import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmitDelete) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
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
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = "Удаление...";
      this._handleSubmitDelete(this._card, this._cardId)
      .then(() => super.close())
      .catch(err => console.log(err))
      .finally(() => {
        this._submitButton.textContent = initialText;
      });
    });
  };
};

export { PopupWithConfirmation };