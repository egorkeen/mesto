// импорт
import './index.css';
import { initialCards } from '../scripts/utils/initialCards.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { info } from 'autoprefixer';

// объявить переменные
// формы
const profileForm = document.forms['profile-form']
const cardForm = document.forms['card-form'];

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// данные инпутов, имя и описание
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');

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
const profileData = new UserInfo ('.profile__name', '.profile__info');

// попап с картинкой
const imagePopup = new PopupWithImage ('.image-popup');

// создать функцию, которая собирает карточку
function createCard(dataCard) {
  const card = new Card (dataCard, '.template', () => {imagePopup.open(dataCard)});
  return card.getView();
}

// создать объект для работы с разметкой
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }},
  '.elements');

  cardList.renderItems();

// попап профиля
const profilePopup = new PopupWithForm ('.profile-popup',
  (inputData) => {
    profileData.setUserInfo(inputData);
});
  // попап добавления карточки
const cardPopup = new PopupWithForm ('.card-popup',
  (dataCard) => {
    cardList.addItem(createCard(dataCard));
});

// включить валидацию
const profileFormValidator = new FormValidator (validationConfig, profileForm);
profileFormValidator.enableValidation();
editButton.addEventListener('click', profileFormValidator.blockForm());
const cardFormValidator = new FormValidator (validationConfig, cardForm);
cardFormValidator.enableValidation();
addButton.addEventListener('click', cardFormValidator.blockForm());

// включить слушатели для попапа с картинкой
imagePopup.setEventListeners();

// включить слушатели для кнопки редактирования и попапа профиля
profilePopup.setEventListeners();
editButton.addEventListener('click', () => {
  nameInput.value = profileData.getUserInfo().nameInput;
  infoInput.value = profileData.getUserInfo().infoInput;
  profilePopup.open()
});

// включить слушатели для кнопки добавления места и попапа места
cardPopup.setEventListeners();
addButton.addEventListener('click', () => { cardPopup.open() });