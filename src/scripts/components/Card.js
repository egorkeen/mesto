import { data } from "autoprefixer";

// класс карточки
class Card {

  constructor(dataCard, templateSelector, imagePopup, confirmationPopup, like, dislike, userData) {
    this._dataCard = dataCard;
    this._templateSelector = templateSelector;
    this._imagePopup = imagePopup;
    this._confirmationPopup = confirmationPopup;
    this._like = like;
    this._dislike = dislike;
    this._userData = userData;
  }

  // установить данные
  _setData() {
    this._titleElement.textContent = this._dataCard.name;
    this._imageElement.src = this._dataCard.link;
    this._imageElement.alt = this._dataCard.name;
  }

  // удалить карточку
  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // подсчитать количество лайков
  _countLikeAmount(dataCard) {
    this._likeAmount.textContent = dataCard.likes.length;
  }

  // лайкнуть карточку и со стороны пользователя, и со стороны сервера
  _likeCard() {
    this._like(this._dataCard._id)
    .then((result) => {
      this._countLikeAmount(result);
      this._likeButton.classList.add('element__like-button_active');
    })
    .catch(err => console.log(err));
  };
// убрать лайк карточки и со стороны пользователя, и со стороны сервера
  _dislikeCard() {
    this._dislike(this._dataCard._id)
    .then((result) => {
      this._countLikeAmount(result);
      this._likeButton.classList.remove('element__like-button_active');
    })
    .catch(err => console.log(err));
  };

  // проверить пользователя на владельца карточки и скрыть/отобразить кнопку удаления карточки
  _checkCardOwner() {
    if (this._dataCard.owner._id !== this._userData.id) {
      this._deleteButton.remove();
    }
  }

  // проверить наличие ранних лайков
  _checkInitialLikes() {
    this._countLikeAmount(this._dataCard);
    if (this._dataCard.likes.find(el => el._id === this._userData.id )) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  // поставить/убрать лайк
  _isLiked() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._dislikeCard();
    } else {
      this._likeCard();
    }
  }

  // установить слушатели
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._imagePopup.open(this._dataCard));
    this._deleteButton.addEventListener('click', () => this._confirmationPopup.open(this._newCard, this._dataCard._id));
    this._likeButton.addEventListener('click', () => this._isLiked());
  }

  // сбрать карточку
  getView() {
    this._newCard = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element').cloneNode(true);
    this._deleteButton = this._newCard.querySelector('.element__delete-button');
    this._checkCardOwner();
    this._imageElement = this._newCard.querySelector('.element__image');
    this._titleElement = this._newCard.querySelector('.element__title');
    this._likeButton = this._newCard.querySelector('.element__like-button');
    this._likeAmount = this._newCard.querySelector('.element__like-amount');
    this._checkInitialLikes();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}

export { Card };