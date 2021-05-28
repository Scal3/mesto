import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ _$selector, handleFormSubmit }) {
        super(_$selector)
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
}




// export default class PopupWithForm extends Popup {
//     constructor({ _$selector}) {
//         super(_$selector)
//         this._$popupForm = this._$selector.querySelector('.popup__form')
//         this._$inputList = Array.from(this._$selector.querySelectorAll('.popup__input'))
//     }

//     setEventListeners() {
//         super.setEventListeners()
//         this._$popupForm.addEventListener('submit', (evt) => {
//             evt.preventDefault()
//         })
//     }

//     close() {
//         super.close()
//         this._$popupForm.reset()
//     }
// }