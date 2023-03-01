class Section {

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.reverse().forEach(this._renderer);
  }

  addItem(card) {
    this._container.prepend(card);
  }

}

export { Section };