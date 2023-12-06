export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) { return Promise.reject(res.status); }
    return res.json();
  }
  getMovies() {
    return fetch(this._baseUrl, {
      // method: "GET",
    }).then(this._getResponseData);
  };
}

export const moviesApi = new MoviesApi({
  baseUrl: `${BASE_URL}`,
  });