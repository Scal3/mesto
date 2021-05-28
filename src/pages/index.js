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
} from "../scripts/utils/constants.js";
import { initialCards } from "../scripts/utils/initial-сards.js";
import Api from "../scripts/components/Api.js";

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


function createCard(item, template, handleCardClick) {
  const card = new Card(
    item,
    template,
    handleCardClick,
    () => {
      api.deleteCard(card.getId()).then(() => {
        card.handleDeleteCard();
      });
    },
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


let user = null;
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
    console.log(cards);
    //ЗАГРУЗКА КАРТОЧЕК С СЕРВЕРА
    cardSection.renderItems(cards);
  })
  .catch((e) => console.log(`Ошибка при получении данных: ${e}`));


//РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ О ЮЗЕРЕ
const popupEditProfile = new PopupWithForm({
  _$selector: selectorPopupTypeProfile,
  handleFormSubmit: ({ name, about }) => {
    api.editProfileInfo({
        name,
        about,
        owner: user._id,
      })
      .then((result) => {
        userInfo.setUserInfo({ name: result.name, about: result.about, avatar: result.avatar }); //ДОДЕЛАТЬ!!!!!!!!!!!!!!
        popupEditProfile.close();
      })
      .catch((e) => console.log(`Ошибка при редактировании профиля: ${e}`));
  },
});


//СОЗДАНИЕ ПОПАПА ДЛЯ КАРТОЧКИ
const popupAddCard = new PopupWithForm({
  _$selector: selectorPopupTypeCard,
  handleFormSubmit: (values) => {
    checkValidImage(values.link)
      .then(() => {
        addCardApi(values);
      })
      .catch(() => {
        console.log("Ошибка адреса");
        popupAddCard.close();
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

const userInfo = new UserInfo({
  nameSelector: inputNameSelector,
  infoSelector: inputJobSelector,
  avatarSelector: userAvatarSelector,
});

const popupImage = new PopupWithImage(selectorPopupTypeImage);

const profileFormValidator = new FormValidator(validationConfig, profileForm);

const cardFormValidator = new FormValidator(validationConfig, cardForm);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
profilePopupButton.addEventListener("click", () => handleProfilePopup());
cardAddButton.addEventListener("click", handleCardPopup);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();