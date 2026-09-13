class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // --- AUTENTICACIÓN ---
  register = ({ name, email, password }) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkRes);
  }

  login = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkRes);
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }

  // --- ARTÍCULOS GUARDADOS ---
  getSavedArticles = () => {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }

  saveArticle = (articleData) => {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(articleData),
    }).then(this._checkRes);
  }

  deleteArticle = (articleId) => {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes);
  }

  // --- MÉTODO AUXILIAR PARA MANEJAR RESPUESTAS ---
  _checkRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

// Instancia de la API (Ajusta la URL a la de tu backend cuando la tengas)
const api = new MainApi({
  baseUrl: 'http://localhost:3001', // O la URL de tu backend en Render/Railway
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
