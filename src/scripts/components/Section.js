export default class Section {
constructor ( { renderer }, selector ) {
    this._renderer = renderer //функция-инструкция
    this._$container = document.querySelector(selector)
  }
  //применяем функцию отрисовки для каждой карточки
  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }
  //Выбираем место отрисовки
  setItem(element, boolean) {
    if (boolean) {
      this._$container.append(element);
    } else {
      this._$container.prepend(element);
    }
  }
}