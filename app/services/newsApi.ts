// app/services/newsApi.ts
import { API_CONFIG } from '../config';
import { Article, Category } from '../types';

// Мок данные на случай проблем с API
const MOCK_ARTICLES: Article[] = [
  {
    title: 'React Native выпускает новую версию',
    description: 'Сегодня вышла новая версия React Native с улучшениями производительности и новыми компонентами.',
    url: 'https://example.com/news/1',
    urlToImage: 'https://picsum.photos/400/200?random=1',
    publishedAt: new Date().toISOString(),
    source: { name: 'Tech News' },
  },
  {
    title: 'ИИ помогает в разработке приложений',
    description: 'Новые инструменты на основе искусственного интеллекта упрощают процесс разработки мобильных приложений.',
    url: 'https://example.com/news/2',
    urlToImage: 'https://picsum.photos/400/200?random=2',
    publishedAt: new Date().toISOString(),
    source: { name: 'AI Daily' },
  },
  {
    title: 'TypeScript 5.5: Что нового?',
    description: 'Вышла новая версия TypeScript с улучшенной производительностью и новыми возможностями.',
    url: 'https://example.com/news/3',
    urlToImage: 'https://picsum.photos/400/200?random=3',
    publishedAt: new Date().toISOString(),
    source: { name: 'Dev Blog' },
  },
];

export class NewsService {
  // Получить топ новостей по категории
  static async getTopHeadlines(
    category: Category = 'general',
    country: string = 'ru'
  ): Promise<Article[]> {
    try {
      // Для GNews API
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/top-headlines?` +
        `category=${category}` +
        `&lang=${country}` +
        `&apikey=${API_CONFIG.API_KEY}` +
        `&max=10`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.warn('API недоступен, используем мок данные:', error);
      // Возвращаем мок данные если API не работает
      return MOCK_ARTICLES;
    }
  }

  // Поиск новостей
  static async searchNews(
    query: string,
    language: string = 'ru'
  ): Promise<Article[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/search?` +
        `q=${encodeURIComponent(query)}` +
        `&lang=${language}` +
        `&apikey=${API_CONFIG.API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
}