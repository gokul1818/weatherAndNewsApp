import * as ActionTypes from './actionTypes';

const initialState = {
  temperatureUnit: 'metric',  // default Celsius
  newsCategories: [],         // user-selected categories
};

const settingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_TEMPERATURE_UNIT:
      return { ...state, temperatureUnit: action.payload };
    case ActionTypes.SET_NEWS_CATEGORIES:
      return { ...state, newsCategories: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
