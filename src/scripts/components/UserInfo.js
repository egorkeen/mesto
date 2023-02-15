class UserInfo {

  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }

   return userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.info;
  }

}

export { UserInfo };