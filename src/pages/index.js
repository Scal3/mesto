import './index.css'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from '../scripts/components/UserInfo.js'
import { profilePopupButton, cardAddButton, typeName, typeJob, validationConfig, cardForm, profileForm , templateSelector} from '../scripts/utils/constants.js'
import { initialCards } from '../scripts/utils/initial-сards.js'



function editProfileFormValidator() {
    const formValidator = new FormValidator(validationConfig, profileForm)
    formValidator.enableValidation()
    profileForm.addEventListener('submit', handleFormSubmit)
    cardAddButton.addEventListener('click', () => formValidator.resetValidation())
    profilePopupButton.addEventListener('click', () => formValidator.resetValidation())
}

function addCardFormValidator() {
    const formValidator = new FormValidator(validationConfig, cardForm)
    formValidator.enableValidation()
    cardForm.addEventListener('submit', handleFormSubmit)
    cardAddButton.addEventListener('click', () => formValidator.resetValidation())
    profilePopupButton.addEventListener('click', () => formValidator.resetValidation())
}

function handleFormSubmit(event) {
  event.preventDefault()
}

function setProfileInputs() {
  typeName.value = userInfo.getUserInfo().name;
  typeJob.value = userInfo.getUserInfo().info;
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
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
})

const popupIEditProfile = new PopupWithForm({
  _$selector: '.popup_type_profile', handleFormSubmit: (values) => {
    userInfo.setUserInfo({ name: values.name, info: values.job })
    popupIEditProfile.close()
  }
})

const popupIAddCard = new PopupWithForm({
  _$selector: '.popup_type_card', handleFormSubmit: (values) => {
    const newCard = createCard({ name: values.name, link: values.link }, templateSelector, () => {
      popupImage.open(values)
    })
    cardSection.prependItem(newCard)
    popupIAddCard.close()
  }
})

const popupImage = new PopupWithImage('.popup_type_image')



profilePopupButton.addEventListener('click', () => popupIEditProfile.open())
profilePopupButton.addEventListener('click', setProfileInputs)
profilePopupButton.addEventListener('click', () => setProfileInputs())
cardAddButton.addEventListener('click', () => popupIAddCard.open())
popupIEditProfile.setEventListeners()
popupIAddCard.setEventListeners()
popupImage.setEventListeners()



editProfileFormValidator()
addCardFormValidator()
cardSection.renderItems()