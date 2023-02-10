import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

  open(dataCard) {
    super.open();
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageSpan = this._popupSelector.querySelector('.popup__image-span');
    this._popupImage.src = dataCard.link;
    this._popupImage.alt = dataCard.name;
    this._popupImageSpan.textContent = dataCard.name;
  }

}

export { PopupWithImage };