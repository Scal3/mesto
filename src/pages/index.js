import './index.css'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from '../scripts/components/UserInfo.js'
import {
  profilePopupButton, cardAddButton, typeName, 
  typeJob, validationConfig, cardForm, 
  profileForm, templateSelector, inputNameSelector, 
  inputJobSelector, selectorPopupTypeProfile, selectorPopupTypeCard, 
  selectorPopupTypeImage, userAvatarSelector, cardInputTypeTitle, 
  cardInputTypeLink,
} from '../scripts/utils/constants.js'
import { initialCards } from '../scripts/utils/initial-сards.js'
import Api from '../scripts/components/Api.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '997275f5-db75-4740-889c-9561326b8f49'
})

function handleProfilePopup() {
  popupEditProfile.open()
  typeName.value = userInfo.getUserInfo().name
  typeJob.value = userInfo.getUserInfo().info
  profileFormValidator.resetValidation()
}

function handleCardPopup() {
  popupAddCard.open()
  cardFormValidator.resetValidation()
}

function createCard({ name, link, likes}, template, handleCardClick) {
  const card = new Card({ name, link, likes}, template, handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
}


//ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
api.getCards()
  .then(result => {
    const cardSection = new Section({
      items: result,
      renderer: (result) => {
        const cardElement = createCard({ name: result.name, link: result.link, likes: result.likes.length}, templateSelector, () => {
          popupImage.open(result)
        })
        cardSection.appendItem(cardElement)
      }
    }, '.cards')
    cardSection.renderItems()
    console.log(result)
  })
  .catch(e => console.log(`Ошибка при получении карточек: ${e}`))


//ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
let user = null
api.getUserData()
  .then(userData => {
    user = userData
    userInfo.setUserInfo({ name: user.name, info: user.about , avatar: user.avatar})
  })
  .catch(e => console.log(`Ошибка при получении информации: ${e}`))


//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
function setUserData() {
  api.editProfileInfo({name: typeName.value, about: typeJob.value})
    .then(res => {
      userInfo.setUserInfo({ name: res.name, info: res.about , avatar: res.avatar})
      popupEditProfile.close()
    })
    .catch(e => console.log(`Ошибка при редактировании профиля: ${e}`))
}
profileForm.addEventListener('submit', setUserData)


//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ 
function addCard() {
  api.addNewCard({name: cardInputTypeTitle.value, link: cardInputTypeLink.value})
    .then(res => {
      const cardSection = new Section({
        items: '',
        renderer: () => {}
      }, '.cards')
      const newCard = createCard({name: res.name, link: res.link}, templateSelector, () => {
        popupImage.open(res)
      })
      cardSection.prependItem(newCard)
      popupAddCard.close()
    })
    .catch(e => console.log(`Ошибка при добавлении карточки: ${e}`))
}

const userInfo = new UserInfo({
  nameSelector: inputNameSelector,
  infoSelector: inputJobSelector,
  avatarSelector: userAvatarSelector
})

const popupEditProfile = new PopupWithForm({_$selector: selectorPopupTypeProfile})

const popupAddCard = new PopupWithForm({_$selector: selectorPopupTypeCard})

const popupImage = new PopupWithImage(selectorPopupTypeImage)

const profileFormValidator = new FormValidator(validationConfig, profileForm)

const cardFormValidator = new FormValidator(validationConfig, cardForm)



popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupImage.setEventListeners()
cardForm.addEventListener('submit', addCard)
profilePopupButton.addEventListener('click', () => handleProfilePopup())
cardAddButton.addEventListener('click', handleCardPopup)



cardFormValidator.enableValidation()
profileFormValidator.enableValidation()