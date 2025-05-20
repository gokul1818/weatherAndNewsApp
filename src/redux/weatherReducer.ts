import * as ActionTypes from './actionTypes';

const initialState = {
    weather: null,
    error: null,
};

const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_WEATHER:
            return { ...state, weather: action.payload, error: null };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default weatherReducer;
