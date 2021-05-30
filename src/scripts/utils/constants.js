export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    fieldSetSelector: '.popup__set',
    errorClass: 'popup__input-error_active'
}


export const submitBtnTexts = {
    current: {
      'form-avatar': 'Сохранить',
      'card-form': 'Создать',
      'profile-form': 'Сохранить',
      'form-remove': 'Да',
    },
    changed: {
      'form-avatar': 'Сохранение...',
      'card-form': 'Добавление...',
      'profile-form': 'Сохранение...',
      'form-remove': 'Удаление...',
    }
  }

export const profilePopupButton = document.querySelector('.profile__edit-button')
export const cardAddButton = document.querySelector('.profile__add-button')
export const typeName = document.querySelector('.popup__input_type_name')
export const typeJob = document.querySelector('.popup__input_type_job')
export const cardForm = document.querySelector('.popup__form_type_card')
export const profileForm = document.querySelector('.popup__form_type_profile')
export const templateSelector = '.template'
export const inputNameSelector = '.profile__name'
export const inputJobSelector = '.profile__job'
export const userAvatarSelector = '.profile__avatar'
export const selectorPopupTypeProfile = '.popup_type_profile'
export const selectorPopupTypeCard = '.popup_type_card'
export const selectorPopupTypeImage = '.popup_type_image'
export const selectorPopupTypeAvatar = '.popup_type_avatar'
export const selectorPopupTypeRemove = '.popup_type_remove'
export const selectorPopupTypeError = '.popup_type_error'
export const avatarBtn = document.querySelector('.profile__avatar')
export const avatarForm = document.querySelector('.popup_type_avatar')