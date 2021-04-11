export const objectOptions = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    fieldSetSelector: '.popup__set',
    errorClass: 'popup__input-error_active'
}
export const profilePopupButton = document.querySelector('.profile__edit-button')
export const cardAddButton = document.querySelector('.profile__add-button')
export const typeName = document.querySelector('.popup__input_type_name')
export const typeJob = document.querySelector('.popup__input_type_job')
export const formsList = Array.from(document.querySelectorAll('.popup__form'))