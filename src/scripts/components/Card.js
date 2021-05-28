export default class Card {
    constructor({ name, link, likes, _id, owner}, selector, handleCardClick, handleDeleteIconClick, {id}, 
        {handleCardLike, handleCardDislike}) {
        this._name = name
        this._link = link
        this._like = likes.length
        this._arrlikes = likes
        this._id = _id
        this._owner = owner
        this._mineId = id
        this._$selector = selector
        this._handleCardClick = handleCardClick
        this._handleDeleteIconClick = handleDeleteIconClick
        this._handleCardLike = handleCardLike
        this._handleCardDislike = handleCardDislike
        this._$element = this._getTemplate()
        this._image = this._$element.querySelector('.card__image')
        this._likeCounter = this._$element.querySelector('.card__like-counter')
        this._likeBtn = this._$element.querySelector('.card__like-button')
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
    // Получаем ID
    getId() {
        return this._id
    }
    // Функция для удаления карточки
    handleDeleteCard() {
        this._$element.remove()
        this._$element = null
    }
    //Функция устанавливающая слушатели
    _setEventListeners() {
        // Слушатель для лайка
        this._likeBtn.addEventListener('click', () => this._handlelike())
        // Слушатель для удаления карточки
        this._$element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteIconClick(this)
        })
        // Слушатель для открытия попапа с картинкой
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }
    _handlelike(){
        if (!this._likeBtn.classList.contains('card__like-button_active')) {
            this._likeBtn.classList.add('card__like-button_active')
            this._handleCardLike();
          } else {
            this._likeBtn.classList.remove('card__like-button_active')
            this._handleCardDislike();
          }
    }
    _setBtnVisible() {
        if (this._owner._id === this._mineId) {
            this._$element.querySelector('.card__delete-button').classList.remove('hidden')
        }}

    _isCardLiked() {
        if (this._arrlikes.some(user => user._id === this._mineId)) {
            this._likeBtn.classList.add('card__like-button_active')
        }}
        setAmountOfLikes(num){
            this._likeCounter.textContent = num;
          }
    // Функция для создания карточки
    generateCard() {
        // Навешиваем слушатели
        this._setEventListeners()

        // Добавим данные
        this._image.src = this._link
        this._image.alt = this._name
        this._likeCounter.textContent = this._like
        this._$element.querySelector('.card__title').textContent = this._name

        this._setBtnVisible()
        this._isCardLiked()
        
        // Вернём элемент наружу
        return this._$element
    }
}