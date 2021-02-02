const popupButton = document.querySelector('.profile__editButton');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const cardLikeButton = document.querySelector('.card__like-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const popupSubmitButton = document.querySelector('.popup__submit');
let typeName = document.querySelector('.popup__input_type_name');
let typeJob = document.querySelector('.popup__input_type_job');

cardLikeButton.addEventListener('click', SwitchLikeColor);
function SwitchLikeColor(){
    cardLikeButton.classList.toggle('card__like-button-active');
}

popupButton.addEventListener('click', togglePopupWindow);
popupSubmitButton.addEventListener('click', togglePopupWindow);
function togglePopupWindow(){
    popup.classList.toggle('popup_opened');
}

let chlen = 

popupCloseButton.addEventListener('click', togglePopupWindowForCloseButton);
function togglePopupWindowForCloseButton(){
    popup.classList.toggle('popup_opened');
}



const popupForm = document.querySelector('.popup__form');
popupForm.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = typeName.value;
    profileJob.textContent = typeJob.value;
}
