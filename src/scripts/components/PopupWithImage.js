import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageSpan = this._popup.querySelector('.popup__image-span');
  }

  open(dataCard) {
    super.open();
    this._popupImage.src = dataCard.link;
    this._popupImage.alt = dataCard.name;
    this._popupImageSpan.textContent = dataCard.name;
  }

}

export { PopupWithImage };