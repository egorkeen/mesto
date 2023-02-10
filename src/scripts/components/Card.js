//класс карточки
class Card {

  constructor(dataCard, templateSelector, handleCardClick) {
    this._dataCard = dataCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //устанавка данные
  _setData() {
    const titleElement = this._newCard.querySelector('.element__title');
    titleElement.textContent = this._dataCard.name;
    const imageElement = this._newCard.querySelector('.element__image');
    imageElement.src = this._dataCard.link;
    imageElement.alt = this._dataCard.name;
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
    const imageElement = this._newCard.querySelector('.element__image');
    imageElement.addEventListener('click', this._handleCardClick);
    const deleteButton = this._newCard.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => { this._deleteCard() });
    const likeButton = this._newCard.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => { this._likeCard() });
  }

  //сборка карточки
  getView() {
    this._newCard = this._templateSelector.cloneNode(true);
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}

export { Card };