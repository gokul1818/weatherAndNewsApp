import * as ActionTypes from './actionTypes';

export const setWeather = (weatherData: any) => ({
    type: ActionTypes.SET_WEATHER,
    payload: weatherData,
});

export const setError = (error: string) => ({
    type: ActionTypes.SET_ERROR,
    payload: error,
});
