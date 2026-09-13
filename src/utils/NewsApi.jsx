class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  // Método para buscar noticias
  getNews(keyword) {
    // Calculamos la fecha de hace 7 días
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    // Formateamos las fechas a YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];

    const url = new URL(`${this._baseUrl}/everything`);
    url.searchParams.append('q', keyword);
    url.searchParams.append('from', formatDate(fromDate));
    url.searchParams.append('to', formatDate(toDate));
    url.searchParams.append('sortBy', 'publishedAt');
    url.searchParams.append('pageSize', '100');
    url.searchParams.append('apiKey', this._apiKey);

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }
}

// Instancia con la URL base y API key
// NOTA: En producción, usa el proxy: https://nomoreparties.co/news
const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2', // Cambiar a 'https://nomoreparties.co/news/v2' en producción
  apiKey: '6d76a8c7e13d482b92937a08a5300246', // ← REEMPLAZA ESTO CON TU API KEY REAL
});

export default newsApi;
