import * as ActionTypes from './actionTypes';

export const setTemperatureUnit = (unit: 'metric' | 'imperial') => ({
  type: ActionTypes.SET_TEMPERATURE_UNIT,
  payload: unit,
});

export const setNewsCategories = (categories: string[]) => ({
  type: ActionTypes.SET_NEWS_CATEGORIES,
  payload: categories,
});
