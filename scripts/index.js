//Объявляем переменные
//popup окна и т.п.
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup__profile-popup');
const cardPopup = document.querySelector('.popup__card-popup');
const imagePopup = document.querySelector('.popup__image-popup');
const popupImage = document.querySelector('.popup__image');
const popupImageSpan = document.querySelector('.popup__image-span');
//формы
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
//кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const profileCloseBtn = document.getElementById('close-profile');
const cardCloseBtn = document.getElementById('close-card');
const imageCloseBtn = document.getElementById('close-image');
const addButton = document.querySelector('.profile__add-button');
const likeButton = document.querySelectorAll('.element__like-button');
const deleteButton = document.querySelectorAll('.element__delete-button');
//данные инпутов, имя и описание
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');
const placeName = document.querySelector('.form__input_place_name');
const placeLink = document.querySelector('.form__input_place_link');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__about');
//переменные для карточек
const cardTemplate = document.querySelector('.template').content.querySelector('.element');
const element = document.querySelectorAll('.element');
const elements = document.querySelector('.elements');
const images = document.querySelectorAll('.element__image');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Вносим данные в окно редактирования
nameInput.value = userName.textContent
infoInput.value = userInfo.textContent;

//Удаление карточек
const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

//Лайк карточки
const handleLikeCard = (event) => {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

//открытие картинки
const handleOpenImage = (event) => {
  openPopup(imagePopup);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupImageSpan.textContent = event.target.alt;
}

//генерация карточки
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const title = newCard.querySelector('.element__title');
  title.textContent = dataCard.name;
  const image = newCard.querySelector('.element__image');
  image.src = dataCard.link;
  image.alt = dataCard.name;
  image.addEventListener('click', handleOpenImage);
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

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

//Добавление Места
function createCard(dataCard) {
  dataCard.preventDefault();
  dataCard.name = placeName.value;
  dataCard.link = placeLink.value;
  renderCard(dataCard);
  closePopup(cardPopup);
}

//Открытие и закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_active');
};

function closePopup(popup) {
  popup.classList.remove('popup_active');
};

//Открытие картинки
const openImage = () => {
  images.forEach(function(image){
    image.addEventListener('click', function(){
      openPopup(imagePopup);
      popupImage.src = image.src;
      popupImage.alt = picture.alt;
      popupImageSpan.textContent = image.alt;
    });
  });
};

//Изменение разметки на основе данных из инпутов
function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = infoInput.value;
    closePopup(profilePopup);
};

//Обработчики
form1.addEventListener('submit', formSubmitHandler);
form2.addEventListener('submit', createCard);
editButton.addEventListener('click', () => {openPopup(profilePopup)});
addButton.addEventListener('click', () => {openPopup(cardPopup)});
profileCloseBtn.addEventListener('click', () => {closePopup(profilePopup)});
cardCloseBtn.addEventListener('click', () => {closePopup(cardPopup)});
imageCloseBtn.addEventListener('click', () => {closePopup(imagePopup)});
