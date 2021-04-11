import './index.css'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from '../scripts/components/UserInfo.js'
import { profilePopupButton, cardAddButton, typeName, typeJob, formsList, objectOptions } from '../scripts/utils/constants.js'
import { initialCards } from '../scripts/utils/initial-сards.js'



function addValidation() {
  formsList.forEach((form) => {
    const formValidator = new FormValidator(objectOptions, form)
    formValidator.enableValidation()
    form.addEventListener('submit', handleFormSubmit)
    cardAddButton.addEventListener('click', () => formValidator.resetValidation())
    profilePopupButton.addEventListener('click', () => formValidator.resetValidation())
  })
}

function handleFormSubmit(event) {
  event.preventDefault()
}

function setProfileInputs() {
  typeName.value = classUserInfo.getUserInfo().name;
  typeJob.value = classUserInfo.getUserInfo().info;
}

function createCard(item, template, handleCardClick) {
  const card = new Card(item, template, handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
}

const cardSection = new Section({
  items: initialCards,
  renderer: (initialCards) => {
    const cardElement = createCard(initialCards, '.template', () => {
      classImagePopup.open(initialCards)
    })
    cardSection.addItem(cardElement)
  }
}, '.cards')

const classUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
})

const classProfilePopup = new PopupWithForm({
  _$selector: '.popup_type_profile', handleFormSubmit: (values) => {
    classUserInfo.setUserInfo({ name: values.name, info: values.job })
    classProfilePopup.close()
  }
})

const classCardPopup = new PopupWithForm({
  _$selector: '.popup_type_card', handleFormSubmit: (values) => {
    const newCard = createCard({ name: values.name, link: values.link }, '.template', () => {
      classImagePopup.open(values)
    })
    cardSection.addNewItem(newCard)
    classCardPopup.close()
  }
})

const classImagePopup = new PopupWithImage('.popup_type_image')



profilePopupButton.addEventListener('click', () => classProfilePopup.open())
profilePopupButton.addEventListener('click', () => setProfileInputs())
cardAddButton.addEventListener('click', () => classCardPopup.open())
classProfilePopup.setEventListeners()
classCardPopup.setEventListeners()
classImagePopup.setEventListeners()



setProfileInputs()
addValidation()
cardSection.renderItems()