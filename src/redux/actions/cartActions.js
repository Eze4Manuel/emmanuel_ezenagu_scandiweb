import { ADD_TO_CART, INCREMENT_COUNTER_BY_POSITION, DECREMENT_COUNTER_BY_POSITION, UPDATE_SETTINGS } from './types';

export const addToCart = (product) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: product
  })
};  
export const incrementCounterByPosition = (ind, counter) => dispatch => {
  dispatch({
    type: INCREMENT_COUNTER_BY_POSITION,
    payload: {ind, counter}
  })
};

export const decrementCounterByPosition = (ind, counter) => dispatch => {
  dispatch({
    type: DECREMENT_COUNTER_BY_POSITION,
    payload: {ind, counter}
  })
};

export const updateSettings = (ind, setting) => dispatch => {
  dispatch({
    type: UPDATE_SETTINGS,
    payload: {ind, setting}
  })
};
