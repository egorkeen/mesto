//Объявляем переменные
//popup окна и т.п.
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
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
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1610197361600-33a3a5073cad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Ростов-на-Дону',
    link: 'https://images.unsplash.com/photo-1560871875-2abe086b8f05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Минск',
    link: 'https://images.unsplash.com/photo-1597986775867-1d871fad81fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Рио-де-Жанейро',
    link: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Пекин',
    link: 'https://images.unsplash.com/photo-1620964780032-81ef649db4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
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
