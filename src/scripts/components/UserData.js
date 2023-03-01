class UserData {

  constructor(profileName, profileAbout, profileAvatar) {
    this._userName = profileName;
    this._userAbout = profileAbout;
    this._userAvatar = profileAvatar;
    this._userId = null;
  }

  getUserData() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      id: this._userId,
    }
  }

  setUserData(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this._userId = userData._id;
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }

}

export { UserData };