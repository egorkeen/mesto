import { profileUserName, profileUserInfo } from '../../pages/index.js';

class UserInfo {

  constructor(userName, userInfo) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
   const userData = {};
   userData.name = this._userName.value;
   userData.info = this._userInfo.value;

   return userData;
  }

  setUserInfo() {
    this._userData = this.getUserInfo();
    profileUserName.textContent = this._userData.name;
    profileUserInfo.textContent = this._userData.info;
  }

}

export { UserInfo };