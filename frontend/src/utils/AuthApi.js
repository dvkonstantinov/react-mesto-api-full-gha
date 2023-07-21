class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  signUp(email, password) {
    const url = `${this._baseUrl}/signup`;
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  signIn(email, password) {
    const url = `${this._baseUrl}/signin`;
    return fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    }).then((response) => {
      return this._checkResponse(response);
    });
  }

  getMyInfo() {
    const headers = this._headers;
    // headers['Authorization'] = `Bearer ${jwt}`
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: "GET",
      headers: headers,
      credentials: 'include',
    }).then((response) => {
      console.log(response.headers["set-cookie"])
      return this._checkResponse(response);
    });
  }

  _checkResponse(response) {
    if (response.status === 200) {
      return response.json();
    }
    return Promise.reject(response);
  }
}


const apiAuth = new ApiAuth({
  baseUrl: "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json",
  },
  // credentials: 'include',
});

export { apiAuth };