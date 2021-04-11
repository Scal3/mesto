export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._$name = document.querySelector(nameSelector)
        this._$info = document.querySelector(infoSelector)
    }

    getUserInfo() {
        return {
            name: this._$name.textContent,
            info: this._$info.textContent
        }
    }

    setUserInfo({ name, info }) {
        this._$name.textContent = name
        this._$info.textContent = info
    }
}