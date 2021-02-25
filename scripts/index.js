const profilePopupButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const template = document.querySelector('.template');
const cardsContainer = document.querySelector('.cards');
const cardAddButton = document.querySelector('.profile__add-button');
const imagePopupPhoto = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector('.image-popup__title');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = document.querySelector('.popup__close-button_type_image');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close-button_type_profile');
const typeName = document.querySelector('.popup__input_type_name');
const typeJob = document.querySelector('.popup__input_type_job');
const profilePopupForm = document.querySelector('.popup__form_type_profile');
const cardPopup = document.querySelector('.popup_type_card');
const cardCloseButton = document.querySelector('.popup__close-button_type_card');
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const cardPopupForm = document.querySelector('.popup__form_type_card');
const popup = document.querySelectorAll('.popup');



function addLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_active');
}

function createCard(item) {
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

  //добавили слушатель для кнопки лайка
  likeButton.addEventListener('click', addLike);

  //добавили слушатель для кнопки удаления карточки
  cardDeleteButton.addEventListener('click', handleDeleteCard);

  //добавили попап с картинкой
  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    imagePopupPhoto.src = item.link;
    imagePopupPhoto.alt = item.name;
    imagePopupTitle.textContent = item.name;
  });


  return templateEl;
}

function dynamicRender() {
  //скопировали массив и сказали ему применить для каждого элемента функцию getItem
  const cardList = initialCards.map(createCard);
  //разбили данные массива на строки и сказали добовлять новые карточки вначало контейнера 
  cardsContainer.append(...cardList);
}

function setInputValue() {
  typeName.value = profileName.textContent;
  typeJob.value = profileJob.textContent;
}

function openPopupWindow() {
  setInputValue();
  openPopup(profilePopup);
}

function handleFormProfile() {
  profileName.textContent = typeName.value;
  profileJob.textContent = typeJob.value;
  closePopup(profilePopup);
}

function handleFormCard(evt) {
  evt.preventDefault();
  const inputName = cardTitleInput.value;
  const inputLink = cardLinkInput.value;
  const item = createCard({ name: inputName, link: inputLink });
  cardsContainer.prepend(item);
  cardPopupForm.reset();
  closePopup(cardPopup);
}

function handleDeleteCard(event) {
  const targetEvt = event.target;
  const item = targetEvt.closest('.card');
  item.remove();
}

function closePopupOnButton(evt) {
  if (evt.keyCode === 27) {
    popup.forEach((popupItem) => {
      popupItem.classList.remove('popup_opened');
    })
  }
}

function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    popup.forEach((popupItem) => {
      popupItem.classList.remove('popup_opened');
    })
  }
}

function openPopup(popupItem) {
  popupItem.classList.add('popup_opened'); //добавляем к popup класс popup_opened
  document.addEventListener('keyup', closePopupOnButton);
  popup.forEach((item) => {
    item.addEventListener('mousedown', closePopupOverlay);
  })
}

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
  document.removeEventListener('keyup', closePopupOnButton);
  popup.forEach((item) => {
    item.removeEventListener('mousedown', closePopupOverlay);
  })
}



cardPopupForm.addEventListener('submit', handleFormCard);
cardAddButton.addEventListener('click', () => openPopup(cardPopup));
cardCloseButton.addEventListener('click', () => closePopup(cardPopup));
profilePopupButton.addEventListener('click', openPopupWindow);
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
profilePopupForm.addEventListener('submit', handleFormProfile);
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));



setInputValue();
dynamicRender();