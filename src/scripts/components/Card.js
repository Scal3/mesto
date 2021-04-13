export default class Card {
    constructor({ name, link }, selector, handleCardClick) {
        this._name = name
        this._link = link
        this._$selector = selector
        this._handleCardClick = handleCardClick
        this._element = this._getTemplate()
        this._image = this._element.querySelector('.card__image')
    }
    // Функция для возврата темплейт элемента
    _getTemplate() {
        const $cardElement = document
            .querySelector(this._$selector)
            .content
            .querySelector('.card')
            .cloneNode(true)

        return $cardElement
    }
    // Функция для переключения лайка
    _addLike(evt) {
        evt.target.classList.toggle('card__like-button_active')
    }
    // Функция для удаления карточки
    _handleDeleteCard(evt) {
        const _targetEvt = evt.target
        const _$item = _targetEvt.closest('.card')
        _$item.remove()
    }
    //Функция устанавливающая слушатели
    _setEventListeners() {
        // Слушатель для лайка
        this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
            this._addLike(evt)
        })
        // Слушатель для удаления карточки
        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            this._handleDeleteCard(evt)
        })
        // Слушатель для открытия попапа с картинкой
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }
    // Функция для создания карточки
    generateCard() {
        // Навешиваем слушатели
        this._setEventListeners()

        // Добавим данные
        this._image.src = this._link
        this._image.alt = this._name
        this._element.querySelector('.card__title').textContent = this._name

        // Вернём элемент наружу
        return this._element
    }
}