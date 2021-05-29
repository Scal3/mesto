export default class Api {
  constructor({baseUrl, token}) {
    this._url = baseUrl
    this._token = token
  }

  getCards() {  //ПОЛУЧИТЬ КАРТОЧКИ С СЕРВЕРА
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  getUserData() { //ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  editProfileInfo({name, about}) {  //ИЗМЕНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  addNewCard({name, link}) {  //ДОБАВИТЬ НОВУЮ КАРТОЧКУ
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  deleteCard(id) {  //УДАЛИТЬ КАРТОЧКУ
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  addLike(card) { //ПОСТАВИТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  removeLike(card) {  //УБРАТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }

  edidProfileAvatar(avatar) { //ИЗМЕНИТЬ ФОТО ПРОФИЛЯ
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
  }
}

