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

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  apiKey: NEWS_API_KEY,
});

export default newsApi;
