//импорты
import { initialCards } from "./initialCards.js";
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

//Объявляем переменные

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
export const imagePopup = document.querySelector('.image-popup');
export const popupImage = document.querySelector('.popup__image');
export const popupImageSpan = document.querySelector('.popup__image-span');

//формы

const profileForm = document.forms['profile-form']
const cardForm = document.forms['card-form'];

//кнопки

const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const profileSubmitButton = document.querySelector('#submit-changes');
const cardSubmitButton = document.querySelector('#submit-place');

//данные инпутов, имя и описание

const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');
const placeName = document.querySelector('.form__input_place_name');
const placeLink = document.querySelector('.form__input_place_link');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__about');

//переменные для карточек

const elements = document.querySelector('.elements');

//шаблон для карточек

const cardTemplate = document
.querySelector('.template')
.content.querySelector('.element');

//конфиг валидации

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputError: 'form__input_type_error',
  activeInputError: 'form__input-error_active',
  submitButtonSelector: '.form__submit-button',
  activeButtonClass: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive'
}

//Открытие и закрытие popup

export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
};

export function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEsc);
};

//добавление карточек

const renderCard = (dataCard) => {
  const card = new Card(dataCard, cardTemplate);
  elements.prepend(card.getView());
};

//загрузка базовых карточек

initialCards.forEach(renderCard);

//Добавление Места

function createCard(evt) {
  evt.preventDefault();
  const item = {};
  item.name = placeName.value;
  item.link = placeLink.value;
  renderCard(item);
  closePopup(cardPopup);
  placeName.value = "";
  placeLink.value = "";
}

//проверка нажатия клавиши escape

const closeByEsc = (event) => {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

//Изменение разметки на основе данных из инпутов

function handleProfileSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = infoInput.value;
    closePopup(profilePopup);
};

//логика кнопки закрытия

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {closePopup(popup)});
});

//закрытие при нажатии по оверлею

popups.forEach(popup => {
  popup.addEventListener('mouseup', function (event) {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup')) {
      closePopup(popup)
    };
  });
});

//Включение валидации

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();

//Обработчики
profileForm.addEventListener('submit', handleProfileSubmit);
cardForm.addEventListener('submit', createCard);
editButton.addEventListener('click', () => {openPopup(profilePopup, nameInput.value = userName.textContent, infoInput.value = userInfo.textContent)});
addButton.addEventListener('click', () => {openPopup(cardPopup)});