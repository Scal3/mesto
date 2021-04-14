export default class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig
        this._$form = form
        this._$inputList = Array.from(this._$form.querySelectorAll(this._validationConfig.inputSelector))
        this._$buttonElement = this._$form.querySelector(this._validationConfig.submitButtonSelector)
    }
    //Функция для вывода ошибки
    _showInputError(inputElement, errorMessage) {
        const _$formSectionElement = inputElement.closest('.popup__section')
        const _$errorElement = _$formSectionElement.querySelector('.popup__input-error')
        _$errorElement.textContent = errorMessage
        _$errorElement.classList.add(this._validationConfig.errorClass)
        inputElement.classList.add(this._validationConfig.inputErrorClass)
    }
    //Функция скрытия ошибки
    _hideInputError(inputElement) {
        const _$formSectionElement = inputElement.closest('.popup__section')
        const _$errorElement = _$formSectionElement.querySelector('.popup__input-error')
        _$errorElement.textContent = ''
        _$errorElement.classList.remove(this._validationConfig.errorClass)
        inputElement.classList.remove(this._validationConfig.inputErrorClass)
    }

    resetValidation() {
        this._$inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })

        this._toggleButtonState()
    }

    //Функция для проверки инпутов на валидность
    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid

        if (isInputNotValid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }
    //Функция поиска хотя бы одноко невалидного инпута
    _findAtLeastOneInvalid() {
        return this._$inputList.some((input) => {
            return !(input.validity.valid)
        })
    }
    //Функция переключения состояния кнопки
    _toggleButtonState() {
        if (this._findAtLeastOneInvalid()) {
            this._$buttonElement.setAttribute('disabled', true)
            this._$buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
        } else {
            this._$buttonElement.removeAttribute('disabled',)
            this._$buttonElement.classList.remove(this._validationConfig.inactiveButtonClass)
        }
    }
    //Функция для установки слушателей
    _setEventListeners() {
        this._toggleButtonState()
        this._$inputList.forEach((input) => {
            input.classList.remove(this._validationConfig.inputErrorClass)
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonState()
            })
        })

    }
    //Функция для включения валидации
    enableValidation() {
        const fieldSetList = Array.from(this._$form.querySelectorAll(this._validationConfig.fieldSetSelector))
        fieldSetList.forEach(() => this._setEventListeners())
    }
}