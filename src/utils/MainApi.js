// export const BASE_URL = 'https://api.akum777.nomoredomains.rocks';
export const BASE_URL = 'http://localhost:3001';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  };

  _checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this._headers.Authorization = `Bearer ${jwt}`;
    };
  }

  _getResponseData(res) {
    if (!res.ok) { return Promise.reject(res.status); }
    return res.json();
  }

  setHeader({ name, value }) {
    this._headers[name] = value;
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "password": `${password}`,
        "email": `${email}`
      }),
    }).then(res => this._getResponseData(res) )
    // .then(this._getResponseData());
  }

  getProfile() {
    this._checkToken();
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  getSavedMovies() {
    this._checkToken();
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  };

  editProfile({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(this._getResponseData)
  };

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie)
    })
      .then(res => this._getResponseData(res))
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  //   addLike(id) {
  //     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //       method: "PUT",
  //       headers: this._headers
  //     })
  //       .then(this._getResponseData)
  //   }

  //   deleteLike(id) {
  //     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //       method: "DELETE",
  //       headers: this._headers
  //     })
  //       .then(this._getResponseData)
  //   }

  //   changeLikeCardStatus(id, isLiked) {
  //     if (isLiked) {
  //       return (api.deleteLike(id))
  //     } else return (api.addLike(id))
  //   }
}

export const mainApi = new MainApi({
  baseUrl: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
