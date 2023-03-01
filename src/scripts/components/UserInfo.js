class UserInfo {

  constructor(profileName, profileInfo, profileAvatar) {
    this._userName = profileName;
    this._userInfo = profileInfo;
    this._userAvatar = profileAvatar;
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      id: this._userId,
    }
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.about;
    this._userId = userData._id;
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }

}

export { UserInfo };