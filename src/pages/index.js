import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { 
  profilePopupButton,
  cardAddButton,
  typeName,
  typeJob,
  validationConfig,
  cardForm,
  profileForm,
  templateSelector,
  inputNameSelector,
  inputJobSelector,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorPopupTypeImage,
  userAvatarSelector,
  selectorPopupTypeAvatar,
  avatarBtn,
  avatarForm,
  selectorPopupTypeRemove,
  submitBtnTexts
} from "../scripts/utils/constants.js";
import Api from "../scripts/components/Api.js";

let cardForDel = null;
let user = null;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  token: "997275f5-db75-4740-889c-9561326b8f49",
});

function handleProfilePopup() {
  popupEditProfile.open();
  typeName.value = userInfo.getUserInfo().name;
  typeJob.value = userInfo.getUserInfo().info;
  profileFormValidator.resetValidation();
}

function handleCardPopup() {
  popupAddCard.open();
  cardFormValidator.resetValidation();
}

function handleAvatarPopup() {
  popupAvatar.open();
  avatarFormValidator.resetValidation();
}


function createCard(item, template, handleCardClick) {
  const card = new Card(
    item,
    template,
    handleCardClick,
    { id: user._id },
    {
      handleCardLike: () => {
        api.addLike(card)
          .then((res) => card.setAmountOfLikes(res.likes.length))
          .catch((err) => console.log(err));
      },
      handleCardDislike: () => {
        api.removeLike(card)
          .then((res) => card.setAmountOfLikes(res.likes.length))
          .catch((err) => console.log(err));
      },
      handleRemoveCard: () => {
        popupRemoveCard.open();
        cardForDel = card;
      },
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}


const cardSection = new Section(
  {
    renderer: (item) => {
      const generatedCard = createCard(item, templateSelector, () => {
        popupImage.open(item);
      });
      cardSection.setItem(generatedCard, true);
    },
  },
  ".cards"
);


Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    //ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
    user = userData;
    userInfo.setUserInfo({
      name: user.name,
      info: user.about,
      avatar: user.avatar,
      userId: user._id,
    });
    //ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
    cardSection.renderItems(cards);
  })
  .catch((e) => console.log(`Ошибка при получении данных: ${e}`));


//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
const popupEditProfile = new PopupWithForm(
  {_$selector: selectorPopupTypeProfile,
    submitBtnTexts: submitBtnTexts,
  handleFormSubmit: ({ name, about }) => {
    popupEditProfile.changeTextOnBtn()
    api.editProfileInfo({
        name,
        about,
      })
      .then((result) => {
        userInfo.setUserInfo({ name: result.name, info: result.about, avatar: result.avatar });
        popupEditProfile.close();
      })
      .catch((e) => console.log(`Ошибка при редактировании профиля: ${e}`));
  },
});


//СОЗДАНИЕ ПОПАПА ДЛЯ КАРТОЧКИ
const popupAddCard = new PopupWithForm(
  {_$selector: selectorPopupTypeCard,
    submitBtnTexts: submitBtnTexts,
  handleFormSubmit: (values) => {
    popupAddCard.changeTextOnBtn()
    checkValidImage(values.link)
      .then(() => {
        addCardApi(values);
      })
      .catch(() => {
        console.log("Ошибка адреса");
      });
  },
});


//ПРОВЕРКА ССЫЛКИ НА ВАЛИДНОСТЬ
function checkValidImage(link) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = link;
    img.onload = resolve;
    img.onerror = reject;
  });
}


//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function addCardApi(values) {
  api.addNewCard({ name: values.name, link: values.link })
    .then((item) => {
      const generatedCard = createCard(item, templateSelector, () => {
        popupImage.open(item);
      });
      cardSection.setItem(generatedCard, false);
      popupAddCard.close();
    })
    .catch((e) => console.log(`Ошибка при добавлении карточки: ${e}`));
}


//ДОБАВЛЕНИЕ НОВОГО АВАТАРА
function changeAvatarApi(values) {
  api.edidProfileAvatar(values.link)
  .then((result) => {
    userInfo.setUserInfo({ name: result.name, info: result.about, avatar: result.avatar });
    popupAvatar.close();
  })
  .catch((e) => console.log(`Ошибка при смене аватара: ${e}`));
}


//СОЗДАНИЕ ПОПАПА ДЛЯ СМЕНЫ АВАТАРА
const popupAvatar = new PopupWithForm(
  {_$selector: selectorPopupTypeAvatar,
    submitBtnTexts: submitBtnTexts,
  handleFormSubmit: (values) => {
    popupAvatar.changeTextOnBtn()
    checkValidImage(values.link)
    .then(()=> {
      changeAvatarApi(values);
    })
    .catch(() => {
      console.log("Ошибка адреса");
    });
  }

})


//СОЗДАНИЕ ПОПАПА ДЛЯ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ
const popupRemoveCard = new PopupWithForm(
  {_$selector: selectorPopupTypeRemove,
    submitBtnTexts: submitBtnTexts,
  handleFormSubmit: () => {
    popupRemoveCard.changeTextOnBtn()
    api.deleteCard(cardForDel._id)
      .then(() => {
        cardForDel.handleDeleteCard();
        popupRemoveCard.close();
      })
      .catch((e) => console.log(`Ошибка при удалении карточки: ${e}`));
  }
});



const userInfo = new UserInfo({
  nameSelector: inputNameSelector,
  infoSelector: inputJobSelector,
  avatarSelector: userAvatarSelector,
});

const popupImage = new PopupWithImage(selectorPopupTypeImage);

const profileFormValidator = new FormValidator(validationConfig, profileForm);

const cardFormValidator = new FormValidator(validationConfig, cardForm);

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupRemoveCard.setEventListeners();
profilePopupButton.addEventListener("click", () => handleProfilePopup());
cardAddButton.addEventListener("click", handleCardPopup);


popupAvatar.setEventListeners();
avatarBtn.addEventListener('click', handleAvatarPopup);


cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();