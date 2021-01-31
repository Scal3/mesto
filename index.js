const popupButton = document.querySelector('.profile__editButton');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const cardLikeButton = document.querySelector('.card__like-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupSubmitButton = document.querySelector('.popup__submit');

cardLikeButton.addEventListener('click', SwitchLikeColor);
function SwitchLikeColor(event){
    cardLikeButton.classList.toggle('card__like-button-active');
}

popupButton.addEventListener('click', togglePopupWindow);
popupCloseButton.addEventListener('click', togglePopupWindow);
popupSubmitButton.addEventListener('click', togglePopupWindow);
function togglePopupWindow(){
    popup.classList.toggle('popup_opened');
}



const popupForm = document.querySelector('.popup__form');
popupForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const one = event.currentTarget.querySelector('.popup__one-input');
    const two = event.currentTarget.querySelector('.popup__sec-input');
    profileName.textContent = one.value;
    profileJob.textContent = two.value;
}
