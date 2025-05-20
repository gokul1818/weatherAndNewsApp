import * as ActionTypes from './actionTypes';

const initialState = {
  news: null,
  error: null,
};

const newsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_NEWS:
      return { ...state, news: action.payload, error: null };
    case ActionTypes.SET_NEWS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
