import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor( { _$selector, submitBtnTexts, handleFormSubmit }) {
        super(_$selector)
        this._submitBtnTexts = submitBtnTexts
        this._$submitBtn = this._$selector.querySelector('.popup__submit')
        this._textOnBtn = this._$selector.querySelector('.popup__form').getAttribute('name')
        this._handleFormSubmit = handleFormSubmit
        this._$popupForm = this._$selector.querySelector('.popup__form')
        this._$inputList = Array.from(this._$selector.querySelectorAll('.popup__input'))
    }

    _getInputValues() {
        this._formValues = {}
        this._$inputList.forEach(input =>
            this._formValues[input.name] = input.value)
        return this._formValues
    }

    _setTextOnBtnToCurrent() {
        this._$submitBtn.textContent = this._submitBtnTexts.current[`${this._textOnBtn}`];
    }

    changeTextOnBtn() {
        this._$submitBtn.textContent = this._submitBtnTexts.changed[`${this._textOnBtn}`];
    }
    
    setEventListeners() {
        super.setEventListeners()
        this._$popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._$popupForm.reset()
    }

    open() {
        super.open()
        this._setTextOnBtnToCurrent()
    }
}