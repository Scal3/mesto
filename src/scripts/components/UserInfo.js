export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector}) {
        this._$name = document.querySelector(nameSelector)
        this._$info = document.querySelector(infoSelector)
        this._$avatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        return {
            name: this._$name.textContent,
            info: this._$info.textContent
        }
    }

    setUserInfo({ name, info, avatar }) {
        this._$name.textContent = name
        this._$info.textContent = info
        this._$avatar.src = avatar
    }
}