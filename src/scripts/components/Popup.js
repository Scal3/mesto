export default class Popup {
    constructor(selector) {
        this._$selector = document.querySelector(selector)
    }

    open() {
        this._$selector.classList.add('popup_opened')
        document.addEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })
    }

    close() {
        this._$selector.classList.remove('popup_opened')
        document.removeEventListener('keyup', (evt) => {
            this._handleEscClose(evt)
        })
    }

    _handleEscClose(evt) {
        const escapeButtonKeyCode = 27
        if (evt.keyCode === escapeButtonKeyCode) {
            this.close()
        }
    }

    setEventListeners() {
        this._$selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close()
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close()
            }
        })
    }

}