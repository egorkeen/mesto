// импорт
import './index.css';
import { initialCards } from '../scripts/components/initialCards.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

// объявить переменные
const profilePopupClass = document.querySelector('.profile-popup');
const cardPopupClass = document.querySelector('.card-popup');

// формы
const profileForm = document.forms['profile-form']
const cardForm = document.forms['card-form'];

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// данные инпутов, имя и описание
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');
const placeName = document.querySelector('.form__input_place_name');
const placeLink = document.querySelector('.form__input_place_link');
export const profileUserName = document.querySelector('.profile__name');
export const profileUserInfo = document.querySelector('.profile__about');

// переменные для карточек
const elements = document.querySelector('.elements');

// шаблон для карточек
const cardTemplate = document
.querySelector('.template')
.content.querySelector('.element');

// конфиг валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputError: 'form__input_type_error',
  activeInputError: 'form__input-error_active',
  submitButtonSelector: '.form__submit-button',
  activeButtonClass: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive'
}

// сбрать данные с помощью класса UserInfo
const profileData = new UserInfo (nameInput, infoInput);

// создать функцию, которая собирает карточку
function createCard(dataCard) {
  const card = new Card (dataCard, cardTemplate, () => {imagePopup.open(dataCard)});
  return card.getView();
}

// создать объект для работы с разметкой
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new createCard(item);
    cardList.addItem(cardElement);
  }},
  elements);

cardList.renderItems();

// попап с картинкой
const imagePopup = new PopupWithImage (document.querySelector('.image-popup'));

// попап профиля
const profilePopup = new PopupWithForm (profilePopupClass,
  (evt) => {
    evt.preventDefault();
    profileData.getUserInfo();
    profileData.setUserInfo();
    profilePopup.close();
});

// попап добавления карточки
const cardPopup = new PopupWithForm (cardPopupClass,
  (evt) => {
    evt.preventDefault();
    const item = {};
    item.name = placeName.value;
    item.link = placeLink.value;
    cardList.addItem(createCard(item));
    cardPopup.close();
  });

// включить валидацию
const profileFormValidator = new FormValidator (validationConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator (validationConfig, cardForm);
cardFormValidator.enableValidation();

// включить слушатели для попапа с картинкой
imagePopup.setEventListeners();

// включить слушатели для кнопки редактирования и попапа профиля
profilePopup.setEventListeners();
editButton.addEventListener('click', () => { profilePopup.open() });

// включить слушатели для кнопки добавления места и попапа места
cardPopup.setEventListeners();
addButton.addEventListener('click', () => { cardPopup.open() });