import axios from 'axios';

const API_KEY = '830b0ea2790c5efd29f56ef56b1bcfda';

export const getWeatherByCity = async (city: string, lat?: number, lon?: number) => {
  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
