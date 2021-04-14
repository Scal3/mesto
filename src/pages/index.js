import './index.css'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from '../scripts/components/UserInfo.js'
import {
  profilePopupButton, cardAddButton, typeName, typeJob, validationConfig, cardForm, profileForm, templateSelector, inputNameSelector
  , inputJobSelector, selectorPopupTypeProfile, selectorPopupTypeCard, selectorPopupTypeImage
} from '../scripts/utils/constants.js'
import { initialCards } from '../scripts/utils/initial-сards.js'



function handleProfilePopup() {
  popupEditProfile.open()
  typeName.value = userInfo.getUserInfo().name
  typeJob.value = userInfo.getUserInfo().info
  profileFormValidator.resetValidation()
}

function handleFormSubmit(event) {
  event.preventDefault()
}

function handleCardPopup() {
  popupAddCard.open()
  cardFormValidator.resetValidation()
}

function createCard(item, template, handleCardClick) {
  const card = new Card(item, template, handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
}

const cardSection = new Section({
  items: initialCards,
  renderer: (initialCards) => {
    const cardElement = createCard(initialCards, templateSelector, () => {
      popupImage.open(initialCards)
    })
    cardSection.appendItem(cardElement)
  }
}, '.cards')

const userInfo = new UserInfo({
  nameSelector: inputNameSelector,
  infoSelector: inputJobSelector
})

const popupEditProfile = new PopupWithForm({
  _$selector: selectorPopupTypeProfile, handleFormSubmit: (values) => {
    userInfo.setUserInfo({ name: values.name, info: values.job })
    popupEditProfile.close()
  }
})

const popupAddCard = new PopupWithForm({
  _$selector: selectorPopupTypeCard, handleFormSubmit: (values) => {
    const newCard = createCard({ name: values.name, link: values.link }, templateSelector, () => {
      popupImage.open(values)
    })
    cardSection.prependItem(newCard)
    popupAddCard.close()
  }
})

const popupImage = new PopupWithImage(selectorPopupTypeImage)

const profileFormValidator = new FormValidator(validationConfig, profileForm)

const cardFormValidator = new FormValidator(validationConfig, cardForm)



popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupImage.setEventListeners()
profileForm.addEventListener('submit', handleFormSubmit)
cardForm.addEventListener('submit', handleFormSubmit)
profilePopupButton.addEventListener('click', () => handleProfilePopup())
cardAddButton.addEventListener('click', () => handleCardPopup())



cardFormValidator.enableValidation()
profileFormValidator.enableValidation()
cardSection.renderItems()