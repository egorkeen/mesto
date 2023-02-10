class Popup {

  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', (event) => { this._handleEscClose(event) });
  }

  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', (event) => { this._handleEscClose(event) });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {

    this._popupSelector.addEventListener('mousedown', (event) => {
      if (event.target === this._popupSelector) {
        this.close();
      };
    });

    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => { this.close() });
  }

}

export { Popup };