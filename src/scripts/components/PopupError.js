import Popup from "./Popup.js";

export default class PopupError extends Popup{
  constructor(_$selector) {
    super(_$selector)
    this.errorMessage = this._$selector.querySelector('.popup__error-message')
  }

  setErrorMessage(text) {
    this.errorMessage.textContent = text
  }
}