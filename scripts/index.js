//Объявляем переменные
const popup = document.querySelector('.popup');
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const editWindow = document.querySelector('.popup__edit-window');
const addWindow = document.querySelector('.popup__add-window');
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__about');
const placeName = document.querySelector('.form__input_place_name');
const placeLink = document.querySelector('.form__input_place_link');
const elements = document.querySelector('.elements');
const element = document.querySelectorAll('.element');
const templateElement = document.querySelector('.template');
const popupPictureWindow = document.querySelector('.popup__picture-window')
const popupPicture = document.querySelector('.popup__opened-picture');
const popupPictureName = document.querySelector('.popup__picture-span');
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

//JavaScript добавляет стандартные карточки
for ( let i = 0; i < initialCards.length; i++) {
  elements.insertAdjacentHTML('beforeend', `<article class="element">
<button type="button" class="element__remove-button"></button>
<img class="element__photo" src="${initialCards[i].link}" alt="${initialCards[i].name}">
<div class="element__container">
  <h2 class="element__title">${initialCards[i].name}</h2>
  <button type="button" class="element__like-button" aria-label="Кнопка лайка"></button>
</div>
</article>`);
};

//Открытие окна редактирования
function openEditWindow() {
  popup.classList.add('popup_opened');
  editWindow.classList.add('popup__edit-window_active')
  nameInput.value = userName.textContent;
  infoInput.value = userInfo.textContent;
};

//Открытие окна добавления места
function openAddWindow() {
  popup.classList.add('popup_opened');
  addWindow.classList.add('popup__add-window_active');
};

//Открытие картинки
const pictures = document.querySelectorAll('.element__photo');
pictures.forEach(function(picture){
  picture.addEventListener('click', function(){
    popup.classList.add('popup_opened');
    popupPictureWindow.classList.add('popup__picutre-window_active');
    popupPicture.src = picture.src;
    popupPicture.alt = picture.alt;
    popupPictureName.textContent = picture.alt;
  })
})

//Закрытие popup
function closePopup() {
  popup.classList.remove('popup_opened');
};

//Закрытие окон
closeButton.forEach(function(button) {
  button.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
    editWindow.classList.remove('popup__edit-window_active');
    addWindow.classList.remove('popup__add-window_active');
    popupPictureWindow.classList.remove('popup__picutre-window_active');
  });
});

//Изменение разметки на основе данных из инпутов
function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = infoInput.value;
    editWindow.classList.remove('popup__edit-window_active');
    closePopup();
};

//Лайк картинки
function like() {
  const likeButton = document.querySelectorAll('.element__like-button');
  likeButton.forEach(function(button) {
    button.addEventListener('click', function() {
      if (button.classList.contains('element__like-button_active')) {
        button.classList.remove('element__like-button_active');
      }
      else {
        button.classList.add('element__like-button_active');
      }
    });
  });
};

//Удаление карточек
const removeButton = document.querySelectorAll('.element__remove-button');
removeButton.forEach(function(button) {
  button.addEventListener('click', function() {
    button.parentElement.remove();
  });
});

//Добавление Места
function createCard(evt) {
  evt.preventDefault();
  const card = templateElement.content.cloneNode(true);
  card.querySelector('.element__title').textContent = placeName.value;
  card.querySelector('.element__photo').src = placeLink.value;
  card.querySelector('.element__photo').alt = placeName.value;
  elements.prepend(card);
  addWindow.classList.remove('popup__add-window_active');
  closePopup();
};

//Обработчики
form1.addEventListener('submit', formSubmitHandler);
form2.addEventListener('submit', createCard);
editButton.addEventListener('click', openEditWindow);
addButton.addEventListener('click', openAddWindow);

