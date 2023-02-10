class Section {

  constructor({ items, renderer }, itemContainer) {
    this._items = items;
    this._renderer = renderer;
    this._itemContainer = itemContainer;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._itemContainer.prepend(item);
  }

}

export { Section };