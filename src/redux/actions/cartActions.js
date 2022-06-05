import { ADD_TO_CART, DECREMENT_COUNTER, INCREMENT_COUNTER, UPDATE_SETTINGS } from './types';

export const addToCart = (product) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: product
  })
}; 
export const incrementCounter = (id, counter) => dispatch => {
  dispatch({
    type: INCREMENT_COUNTER,
    payload: {id, counter}
  })
};
export const decrementCounter = (id, counter) => dispatch => {
  dispatch({
    type: DECREMENT_COUNTER,
    payload: {id, counter}
  })
};
export const updateSettings = (id, setting) => dispatch => {
  dispatch({
    type: UPDATE_SETTINGS,
    payload: {id, setting}
  })
};
