import axios from 'axios';

const NEWS_API_KEY = 'd1f997caa0704be4982c8cd27e70ecdc'; // get from https://newsapi.org/
const NEWS_BASE_URL = 'https://newsapi.org/v2';

export const getNewsByCategory = async (category: string) => {
  const response = await axios.get(
    `${NEWS_BASE_URL}/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&language=en`
  );
  return response.data;
};
