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
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getUserData() { //ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
        about: about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
        link: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteCard(id) {  //УДАЛИТЬ КАРТОЧКУ
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  addLike(id) { //ПОСТАВИТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  removeLike(id) {  //УБРАТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
}

