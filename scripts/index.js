/*Объявляем переменные*/
let submitButton = document.querySelector('.edit-form__submit-button');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

/*Открытие окна*/
function openPopup() {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup');
}
editButton.addEventListener('click', openPopup);

/*Закрытие окна*/
function closePopup() {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup');
}
closeButton.addEventListener('click', closePopup);

/*Изменение имени и информации*/
function saveChanges() {
  let profileName = document.querySelector('.profile__name');
  let profileInfo = document.querySelector('.profile__about');
  let userName = document.querySelector('.edit-form__user-name').value;
  let userInfo = document.querySelector('.edit-form__user-info').value;
  profileName.textContent = userName;
  profileInfo.textContent = userInfo;
  closePopup()
  evt.preventDefault()
}
submitButton.addEventListener('click', saveChanges);