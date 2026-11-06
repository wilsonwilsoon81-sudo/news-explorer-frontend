import { NEWS_API_KEY, NEWS_API_BASE_URL } from './constants';

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

    getNews(keyword) {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    const formatDate = (date) => date.toISOString().split('T')[0];

    // 1. Construimos la URL original de NewsAPI
    const originalUrl = new URL(`${this._baseUrl}/everything`);
    originalUrl.searchParams.append('q', keyword);
    originalUrl.searchParams.append('from', formatDate(fromDate));
    originalUrl.searchParams.append('to', formatDate(toDate));
    originalUrl.searchParams.append('sortBy', 'publishedAt');
    originalUrl.searchParams.append('pageSize', '20'); // Mantenemos 20 para velocidad
    originalUrl.searchParams.append('apiKey', this._apiKey);

    // 2. Usamos corsproxy.io para envolver la URL y evitar bloqueos CORS/Timeouts
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(originalUrl.toString())}`;

    return fetch(proxyUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.error("Error al conectar con la API de noticias:", error);
        throw new Error("No se pudo cargar las noticias. Por favor, intenta de nuevo.");
      });
  }
}

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  apiKey: NEWS_API_KEY,
});

export default newsApi;
