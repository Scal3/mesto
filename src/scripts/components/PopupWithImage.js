import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(_$selector) {
        super(_$selector)
        this._$image = this._$selector.querySelector('.image-popup__image')
        this._$title = this._$selector.querySelector('.image-popup__title')
    }

    open({ name, link }) {
        this._$image.src = link
        this._$title.alt = name
        this._$title.textContent = name
        super.open()
    }
}