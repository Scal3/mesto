import Popup from "./Popup.js"
// новый класс модалки с подтверждением
export default class PopupWithConfirm extends Popup {
  // это перетягиваем с PopupWithForm, только ничего не пробрасываем
  // в _submitHandler
  constructor() {

  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
  // эта функция будет подменять функцию при сабмите при открытии модалки
  // там будет реф на актуальный id клискнутой карточки
  setNewSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler;
  }
}