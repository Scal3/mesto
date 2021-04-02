import Card from './Card.js'
import FormValidator from './FormValidator.js'



const objectOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  fieldSetSelector: '.popup__set',
  errorClass: 'popup__input-error_active'
}
const profilePopupButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const cardsContainer = document.querySelector('.cards')
const cardAddButton = document.querySelector('.profile__add-button')
export const imagePopupPhoto = document.querySelector('.image-popup__image')
export const imagePopupTitle = document.querySelector('.image-popup__title')
export const imagePopup = document.querySelector('.popup_type_image')
const imageCloseButton = document.querySelector('.popup__close-button_type_image')
const profilePopup = document.querySelector('.popup_type_profile')
const profilePopupCloseButton = document.querySelector('.popup__close-button_type_profile')
const typeName = document.querySelector('.popup__input_type_name')
const typeJob = document.querySelector('.popup__input_type_job')
const profilePopupForm = document.querySelector('.popup__form_type_profile')
const cardPopup = document.querySelector('.popup_type_card')
const cardCloseButton = document.querySelector('.popup__close-button_type_card')
const cardTitleInput = document.querySelector('.popup__input_type_title')
const cardLinkInput = document.querySelector('.popup__input_type_link')
const cardPopupForm = document.querySelector('.popup__form_type_card')
const popupList = document.querySelectorAll('.popup')
const escapeButtonKeyCode = 27
const formsList = Array.from(document.querySelectorAll('.popup__form'))



function addCard() {
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, '.template')
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard()
    // Добавляем в DOM
    cardsContainer.append(cardElement)
  });
}

function addValidation() {
  formsList.forEach((form) => {
    const formValidator = new FormValidator(objectOptions, form)
    formValidator.enableValidation()
    form.addEventListener('submit', handleFormSubmit)
  })
}

function handleFormSubmit (event) {
  event.preventDefault()
}

function setProfileInputs() {
  typeName.value = profileName.textContent
  typeJob.value = profileJob.textContent
}

function openProfilePopup() {
  setProfileInputs()
  openPopup(profilePopup)
}

function handleFormProfile() {
  profileName.textContent = typeName.value
  profileJob.textContent = typeJob.value
  closePopup(profilePopup)
}

function handleFormCard() {
  const inputName = cardTitleInput.value
  const inputLink = cardLinkInput.value
  const card = new Card(inputName, inputLink, '.template')
  const cardElement = card.generateCard()
  cardsContainer.prepend(cardElement)
  cardPopupForm.reset()
  closePopup(cardPopup)
}

function closePopupOnButton(event) {
  if (event.keyCode === escapeButtonKeyCode) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget)
  }
}

export function openPopup(popupItem) {
  popupItem.classList.add('popup_opened') //добавляем к popup класс popup_opened
  document.addEventListener('keyup', closePopupOnButton)
}

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened') //удаляем у popup класс popup_opened
  document.removeEventListener('keyup', closePopupOnButton)
}

function offSubmitButton() {
  const popupSubmit = document.querySelector('.popup__submit_type_card')
  popupSubmit.setAttribute('disabled', true)
  popupSubmit.classList.add('popup__submit_inactive')
}



cardAddButton.addEventListener('click', offSubmitButton)
cardPopupForm.addEventListener('submit', handleFormCard)
cardAddButton.addEventListener('click', () => openPopup(cardPopup))
cardCloseButton.addEventListener('click', () => closePopup(cardPopup))
profilePopupButton.addEventListener('click', openProfilePopup)
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup))
profilePopupForm.addEventListener('submit', handleFormProfile)
imageCloseButton.addEventListener('click', () => closePopup(imagePopup))
popupList.forEach((item) => {
  item.addEventListener('click', closePopupOverlay)
})



setProfileInputs()
addCard()
addValidation()