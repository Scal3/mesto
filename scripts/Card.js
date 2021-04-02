import { openPopup, imagePopupPhoto, imagePopupTitle, imagePopup } from './index.js'

export default class Card {
    constructor(name, link, selector) {
        this._name = name
        this._link = link
        this._$selector = selector
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
    // Функция для открытия попапа
    _openImagePopup(evt) {
        if (evt.target.classList.contains('card__image')) {
            openPopup(imagePopup)
            imagePopupPhoto.src = this._link
            imagePopupPhoto.alt = this._name
            imagePopupTitle.textContent = this._name
        }
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
        this._element.querySelector('.card__image').addEventListener('click', (evt) => {
            this._openImagePopup(evt)
        })
    }
    // Функция для создания карточки
    generateCard() {
        // Запишем разметку в _element. 
        this._element = this._getTemplate()
        this._setEventListeners()

        // Добавим данные
        this._element.querySelector('.card__image').src = this._link
        this._element.querySelector('.card__image').alt = this._name
        this._element.querySelector('.card__title').textContent = this._name

        // Вернём элемент наружу
        return this._element
    }
}