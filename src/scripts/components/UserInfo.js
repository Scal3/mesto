export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector, userId}) {
        this._$name = document.querySelector(nameSelector)
        this._$info = document.querySelector(infoSelector)
        this._$avatar = document.querySelector(avatarSelector)
        this._userId = userId
    }

    getUserInfo() {
        return {
            name: this._$name.textContent,
            info: this._$info.textContent,
            id: this._userId
        }
    }

    setUserInfo({ name, info, avatar, userId }) {
        this._$name.textContent = name
        this._$info.textContent = info
        this._$avatar.src = avatar
        this._userId = userId
    }
}