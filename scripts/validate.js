const showInputError = (inputElement, errorMessage, inputErrorClass, errorClass) => {
    const formSectionElement = inputElement.closest('.popup__section');
    const errorElement = formSectionElement.querySelector('.popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
}

const hideInputError = (inputElement, inputErrorClass, errorClass) => {
    const formSectionElement = inputElement.closest('.popup__section');
    const errorElement = formSectionElement.querySelector('.popup__input-error');
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        showInputError(inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(inputElement, inputErrorClass, errorClass);
    }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const findAtLeastOneInvalid = (inputElement) => !inputElement.validity.valid;
    const hasInvalidInput = inputList.some(findAtLeastOneInvalid);

    if (hasInvalidInput) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled',);
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const handleFormSubmit = (event) => {
    event.preventDefault();
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {

    formElement.addEventListener('submit', handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    };

    inputList.forEach(inputListIterator);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});