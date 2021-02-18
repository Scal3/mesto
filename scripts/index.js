const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const typeName = document.querySelector('.popup__input_type_name');
const typeJob = document.querySelector('.popup__input_type_job');
const popupForm = document.querySelector('.popup__form');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const template = document.querySelector('.template');
const cards = document.querySelector('.cards');
const cardAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.card-popup');
const cardCloseButton = document.querySelector('.card-popup__close-button');
const cardSubmitButton = document.querySelector('.card-popup__submit');
const cardNameInput = document.querySelector('.card-popup__input_type_name');
const cardLinkInput = document.querySelector('.card-popup__input_type_link');
const imagePopup = document.querySelector('.image-popup');
const imageDeleteButton = document.querySelector('.image-popup__close-button');
const imagePopupPhoto = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector('.image-popup__title');



function openPopupWindow(){
    typeName.value = profileName.textContent;
    typeJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

function closePopupWindow(){
    popup.classList.remove('popup_opened');
}

function handleFormProfile(event) {
    event.preventDefault();
    profileName.textContent = typeName.value;
    profileJob.textContent = typeJob.value;
    closePopupWindow();
}

function getItem(item) {
  //нашли все элементы
  const templateEl = template.content.cloneNode(true);
  const cardImage = templateEl.querySelector('.card__image');
  const cardTitle = templateEl.querySelector('.card__title');
  const likeButton = templateEl.querySelector('.card__like-button');
  const cardDeleteButton = templateEl.querySelector('.card__delete-button');

  //задали нужные значения
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  // создали возможность ставить лайки
  likeButton.addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_active');
});

  //добавили слушатель для кнопки удаления карточки
  cardDeleteButton.addEventListener('click', handleDeleteCard);

  //добавили попап с картинкой
  cardImage.addEventListener('click', function () {
    imagePopup.classList.add('image-popup_opened');
    const imagePopupPhoto = document.querySelector('.image-popup__image');
    const imagePopupTitle = document.querySelector('.image-popup__title');
    imagePopupPhoto.src = item.link;
    imagePopupPhoto.alt = item.name;
    imagePopupTitle.textContent = item.name;
  });

  return templateEl;
}

function dynamicrender() {
    //скопировали массив и сказали ему применить для каждого элемента функцию getItem
    const cardList = initialCards.map(getItem);
    //разбили данные массива на строки и сказали добовлять новые карточки вначало контейнера 
    cards.append(...cardList);
}

function openCardWindow() {
  cardPopup.classList.add('card-popup_opened');
}

function closeCardWindow(){
  cardPopup.classList.remove('card-popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function handleFormCard() {
  const inputName = cardNameInput.value;
  const inputLink = cardLinkInput.value;
  const item = getItem({name: inputName, link: inputLink});
  cards.prepend(item);
  closeCardWindow();
}

function handleDeleteCard(event) {
  const targetEvt = event.target;
  const Item = targetEvt.closest('.card');
  Item.remove();
}

function closeImageWindow() {
  imagePopup.classList.remove('image-popup_opened');
}



popupButton.addEventListener('click', openPopupWindow);
popupCloseButton.addEventListener('click', closePopupWindow);
popupForm.addEventListener('submit', handleFormProfile);
cardSubmitButton.addEventListener('click', handleFormCard);
cardAddButton.addEventListener('click', openCardWindow);
cardCloseButton.addEventListener('click', closeCardWindow);
imageDeleteButton.addEventListener('click', closeImageWindow);


dynamicrender();


