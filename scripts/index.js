const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const popupSubmitButton = document.querySelector('.popup__submit');
let typeName = document.querySelector('.popup__input_type_name');
let typeJob = document.querySelector('.popup__input_type_job');
const popupForm = document.querySelector('.popup__form');


function openPopupWindow(){
    typeName.value = profileName.innerHTML;
    typeJob.value = profileJob.innerHTML;
    popup.classList.add('popup_opened');
}

function closePopupWindow(){
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = typeName.value;
    profileJob.textContent = typeJob.value;
    closePopupWindow();
}

popupButton.addEventListener('click', openPopupWindow);
popupCloseButton.addEventListener('click', closePopupWindow);
popupForm.addEventListener('submit', handleFormSubmit);


