/*-----ИМПОРТЫ-------*/

import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js'
import {
  profileForm,
  cardForm,
  avatarForm,
  profileName,
  profileInfo,
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
})

// сбрать данные с помощью класса UserInfo
const profileData = new UserInfo (profileName, profileInfo, profileAvatar);

// получить имя, описание и аватар с сервера
api.getUserInfo()
.then((res => {
  profileData.setUserInfo(res);
  profileAvatar.src = res.avatar;
}));

// попап с картинкой
const imagePopup = new PopupWithImage ('.image-popup');

// попап удаления карточки
const confirmationPopup = new PopupWithConfirmation ('.delete-popup',
(card, cardId) => {
  card.remove();
  api.deleteCard(cardId);
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
    profileData.getUserInfo());

  return card.getView();
}

// создать объект для работы с разметкой
const cardList = new Section ({
  renderer: (dataCard) => {
    const cardElement = createCard(dataCard);
    cardList.addItem(cardElement);
  }},
  '.elements');

  // получить карточки с сервера
api.getInitialCards()
.then((res) => {
  cardList.renderItems(res);
})

// попап профиля
const profilePopup = new PopupWithForm ('.profile-popup',
  (inputData) => {
    profilePopup.setButtonText('Сохранение...');
    api.setUserInfo(inputData)
    .then(() => {
      profileData.setUserInfo(inputData);
      profilePopup.setButtonText('Сохранить')});
});

// попап добавления карточки
const cardPopup = new PopupWithForm ('.card-popup',
  (dataCard) => {
    cardPopup.setButtonText('Создание...')
    api.addCard(dataCard)
    .then((res) => {
      cardList.addItem(createCard(res));
      cardPopup.setButtonText('Создать');
    });
});

// попап редактирования аватара
const avatarPopup = new PopupWithForm ('.avatar-popup',
 (inputData) => {
  avatarPopup.setButtonText('Сохранение...');
  api.setAvatar(inputData.avatar)
  .then(() => {
    profileAvatar.src = inputData.avatar;
    avatarPopup.setButtonText('Сохранить');
  });
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
  const { name, about } = profileData.getUserInfo();
  nameInput.value = name;
  infoInput.value = about;
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