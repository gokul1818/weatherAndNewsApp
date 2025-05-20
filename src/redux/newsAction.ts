import * as ActionTypes from './actionTypes';

export const setNews = (newsData: any) => ({
  type: ActionTypes.SET_NEWS,
  payload: newsData,
});

export const setNewsError = (error: string) => ({
  type: ActionTypes.SET_NEWS_ERROR,
  payload: error,
});
