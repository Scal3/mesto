export default class Section {
    constructor({ items, renderer }, selector) {
        this._itemsArray = items
        this._renderer = renderer //функция-инструкция
        this._$container = document.querySelector(selector)
    }
    //апендим готовый элемент в нужный контейнер
    appendItem(element) {
        this._$container.append(element)
    }
    //препендим новый элемент в нужный контейнер
    prependItem(element) {
        this._$container.prepend(element)
    }
    //применяем функцию отрисовки для каждой карточки
    renderItems() {
        this._itemsArray.forEach(item => {
            this._renderer(item)
        })
    }
}