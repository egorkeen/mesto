//класс карточки
class Card {

  constructor(dataCard, templateSelector, handleCardClick) {
    this._dataCard = dataCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //устанавка данные
  _setData() {
    this._titleElement.textContent = this._dataCard.name;
    this._imageElement.src = this._dataCard.link;
    this._imageElement.alt = this._dataCard.name;
  }

  //удаление карточки
  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  //лайк карточки
  _likeCard() {
    this._newCard.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  //установка слушателей
  _setEventListeners() {
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._deleteButton.addEventListener('click', () => { this._deleteCard() });
    this._likeButton.addEventListener('click', () => { this._likeCard() });
  }

  //сборка карточки
  getView() {
    this._newCard = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element').cloneNode(true);
    this._imageElement = this._newCard.querySelector('.element__image');
    this._deleteButton = this._newCard.querySelector('.element__delete-button');
    this._titleElement = this._newCard.querySelector('.element__title');
    this._likeButton = this._newCard.querySelector('.element__like-button');
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}

export { Card };