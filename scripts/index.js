//Объявляем переменные
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.popup__image');
const popupImageSpan = document.querySelector('.popup__image-span');
//формы
const profileForm = document.forms['profile-form']
const cardForm = document.forms['card-form'];
//кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
//данные инпутов, имя и описание
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');
const placeName = document.querySelector('.form__input_place_name');
const placeLink = document.querySelector('.form__input_place_link');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__about');
//переменные для карточек
const cardTemplate = document.querySelector('.template').content.querySelector('.element');
const elements = document.querySelector('.elements');
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

//Удаление карточек
const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

//Лайк карточки
const handleLikeCard = (event) => {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

//открытие картинки
const handleOpenImage = (dataCard) => {
  popupImage.src = dataCard.link;
  popupImage.alt = dataCard.name;
  popupImageSpan.textContent = dataCard.name;
  openPopup(imagePopup);
}

//генерация карточки
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const title = newCard.querySelector('.element__title');
  title.textContent = dataCard.name;
  const image = newCard.querySelector('.element__image');
  image.src = dataCard.link;
  image.alt = dataCard.name;
  image.addEventListener('click', () => handleOpenImage(dataCard));
  const deleteButton = newCard.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);
  const likeButton = newCard.querySelector('.element__like-button');
  likeButton.addEventListener('click', handleLikeCard);
  return newCard;
}

//добавление карточек
const renderCard = (dataCard) => {
  elements.prepend(generateCard(dataCard));
};

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

//Открытие и закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
  blockForm(validationConfig);
};

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEsc);
};

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
enableValidation(validationConfig);

//Обработчики
profileForm.addEventListener('submit', handleProfileSubmit);
cardForm.addEventListener('submit', createCard);
editButton.addEventListener('click', () => {openPopup(profilePopup, nameInput.value = userName.textContent, infoInput.value = userInfo.textContent)});
addButton.addEventListener('click', () => {openPopup(cardPopup)});