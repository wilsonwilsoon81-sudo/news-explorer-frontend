const MAIN_API_URL = 'https://news-explorer-backend-ig2o.onrender.com/api';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
};

const getToken = () => localStorage.getItem('jwt');

export const register = (name, email, password) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = () => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};

export const getSavedArticles = () => {
  return fetch(`${MAIN_API_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};

export const saveArticle = (articleData) => {
  return fetch(`${MAIN_API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(articleData),
  }).then(checkResponse);
};

export const deleteArticle = (articleId) => {
  return fetch(`${MAIN_API_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};
