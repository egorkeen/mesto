class UserInfo {

  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const inputData = {
      nameInput: this._userName.textContent,
      infoInput: this._userInfo.textContent
    }

   return inputData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.info;
  }

}

export { UserInfo };