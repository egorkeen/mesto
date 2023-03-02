/*-----ИМПОРТЫ-------*/

import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserData } from '../scripts/components/UserData.js';
import { Api } from '../scripts/components/Api.js'
import {
  profileForm,
  cardForm,
  avatarForm,
  profileName,
  profileAbout,
  profileAvatar,
  editButton,
  avatarEditButton,
  addButton,
  nameInput,
  infoInput,
  validationConfig
} from '../scripts/utils/constants.js'


// API
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'fb50cc1e-04bc-4642-bf09-6823f011b623',
    'Content-Type': 'application/json'
  }
});

// сбрать данные с помощью класса UserInfo
const profileData = new UserData (profileName, profileAbout, profileAvatar);

// получить данные пользователя и карточки с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileData.setUserData(userData);
    cardList.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });

// попап с картинкой
const imagePopup = new PopupWithImage ('.image-popup');

// попап удаления карточки
const confirmationPopup = new PopupWithConfirmation ('.confirmation-popup',
 (card, cardId) => {
  return api.deleteCard(cardId)
  .then(() => card.remove())
});

// создать функции кнопки лайка, чтобы создать карточку
const like = cardId => api.like(cardId);
const dislike = cardId => api.dislike(cardId);

// создать функцию, которая собирает карточку
function createCard(dataCard) {

  const card = new Card (
    dataCard,
    '.template',
    imagePopup,
    confirmationPopup,
    like,
    dislike,
    profileData.getUserData());

  return card.getView();
}

// создать объект для работы с разметкой
const cardList = new Section ({
  renderer: (dataCard) => {
    const cardElement = createCard(dataCard);
    cardList.addItem(cardElement);
  }},
  '.elements');

// попап профиля
const profilePopup = new PopupWithForm ('.profile-popup',
  (inputData) => {
    return api.setUserData(inputData)
    .then((res) => {
      profileData.setUserData(res);
    })
});

// попап добавления карточки
const cardPopup = new PopupWithForm ('.card-popup',
  (dataCard) => {
    return api.addCard(dataCard)
    .then((res) => {
      cardList.addItem(createCard(res));
    })
});

// попап редактирования аватара
const avatarPopup = new PopupWithForm ('.avatar-popup',
 (inputData) => {
  return api.setAvatar(inputData.avatar)
  .then(() => {
    profileData.setUserAvatar(inputData.avatar);
  })
 }
);


/*---------СЛУШАТЕЛИ И ВАЛИДАЦИЯ---------*/

// включить валидацию
const profileFormValidator = new FormValidator (validationConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator (validationConfig, cardForm);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

// включить слушатели для кнопки редактирования, попапа редактирования профиля и блокировки кнопки
profilePopup.setEventListeners();
editButton.addEventListener('click', () => {
  profileFormValidator.blockForm();
  profilePopup.setInputValues(profileData.getUserData());
  profilePopup.open()
});

// включить слушатели для кнопки добавления места, попапа с добавлением карточки и блокировки кнопки
cardPopup.setEventListeners();
addButton.addEventListener('click', () => {
  cardPopup.open();
  cardFormValidator.blockForm();
});

// включить слушатели для кнопки редактирования аватара и попапа
avatarPopup.setEventListeners();
avatarEditButton.addEventListener('click', () => {
  avatarPopup.open();
});

// включить слушатели для попапа подтверждения удаления карточки
confirmationPopup.setEventListeners();

// включить слушатели для попапа с картинкой
imagePopup.setEventListeners();