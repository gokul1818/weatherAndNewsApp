import { combineReducers, createStore } from 'redux';
import weatherReducer from './weatherReducer';
import newsReducer from './newsReducer';
import settingsReducer from './settingReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  news: newsReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer);

export default store;
