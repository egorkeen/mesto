//Объявляем переменные
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.form__input_data_name');
let infoInput = formElement.querySelector('.form__input_data_info');
let userName = document.querySelector('.profile__name');
let userInfo = document.querySelector('.profile__about');

//Открытие popup'а
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  infoInput.value = userInfo.textContent;
}

//Закрытие popup'а
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Изменение разметки на основе данных из инпутов
function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = infoInput.value;
    closePopup();
}

//Обработчики
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
