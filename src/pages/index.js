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
  selectorPopupTypeImage, userAvatarSelector,
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

function createCard({ name, link, likes, id}, template, handleCardClick) {
  const card = new Card({ name, link, likes, id}, template, handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
}

const cardSection = new Section({
  renderer: item => {
    const generatedCard = createCard(
      { name: item.name, link: item.link, likes: item.likes.length, id:user.owner }, 
      templateSelector, 
      () => { popupImage.open(item) })
    cardSection.setItem(generatedCard, true);
  }
},'.cards');


let user = null
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    //ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
    user = userData
    userInfo.setUserInfo({
      name: user.name,
      info: user.about ,
      avatar: user.avatar,
      userId: user._id})

    //ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
    cardSection.renderItems(cards)
})
  .catch(e => console.log(`Ошибка при получении данных: ${e}`))


//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
const popupEditProfile = new PopupWithForm({_$selector: selectorPopupTypeProfile, 
  handleFormSubmit: ({name, about}) => {
    api.editProfileInfo({
      name, 
      about,
      owner: user._id
    })
    .then(result => {
      userInfo.setUserInfo({ name: result.name, about: result.about , avatar: result.avatar})//ДОДЕЛАТЬ!!!!!!!!!!!!!!
      popupEditProfile.close()
    })
    .catch(e => console.log(`Ошибка при редактировании профиля: ${e}`))
  }
})


//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ 
const popupAddCard = new PopupWithForm({_$selector: selectorPopupTypeCard, 
  handleFormSubmit: ({name, link}) => {
    api.addNewCard({
      name, 
      link, 
      owner: user._id
    })
    .then(result => {
      const newCard = createCard({name: result.name, link: result.link}, templateSelector, () => {
        popupImage.open(result)
      })
      cardSection.setItem(newCard, false)
      popupAddCard.close()
    })
    .catch(e => console.log(`Ошибка при добавлении карточки: ${e}`))
    }})


const userInfo = new UserInfo({
  nameSelector: inputNameSelector,
  infoSelector: inputJobSelector,
  avatarSelector: userAvatarSelector
})


const popupImage = new PopupWithImage(selectorPopupTypeImage)

const profileFormValidator = new FormValidator(validationConfig, profileForm)

const cardFormValidator = new FormValidator(validationConfig, cardForm)



popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupImage.setEventListeners()
profilePopupButton.addEventListener('click', () => handleProfilePopup())
cardAddButton.addEventListener('click', handleCardPopup)



cardFormValidator.enableValidation()
profileFormValidator.enableValidation()