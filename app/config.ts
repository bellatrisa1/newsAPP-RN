// app/config.ts
export const API_CONFIG = {
  // Используем GNews API (проще для начала)
  BASE_URL: 'https://gnews.io/api/v4',
  API_KEY: '58ddf99f148a5f9c9d0d2bd40510369f', // Ваш ключ
  
  // Или NewsAPI (закомментируйте одну из секций)
  // BASE_URL: 'https://newsapi.org/v2',
  // API_KEY: 'ваш_newsapi_ключ', // Нужна отдельная регистрация
} as const;