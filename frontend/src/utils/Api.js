class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  setUserInfo(newName, newStatus) {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: newName,
        about: newStatus,
      }),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  addCard(cardName, cardUrl) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardName,
        link: cardUrl,
      }),
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  removeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  likeDislikeCard(cardId, isLiked) {
    const method = isLiked? "DELETE" : "PUT"
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    return fetch(url, {
      method: method,
      headers: this._headers,
      credentials: 'include',
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  updateAvatar(newAvatarUrl) {
    const url = `${this._baseUrl}/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: newAvatarUrl,
      }),
    }).then((response) => {
      return this._checkResponse(response)
    });
  }

  _checkResponse(response) {
    if (response.status === 200) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}


const api = new Api({
  baseUrl: "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
});

export { api };