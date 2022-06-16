import { ADD_TO_CART, INCREMENT_COUNTER_BY_POSITION, DECREMENT_COUNTER_BY_POSITION, UPDATE_SETTINGS } from '../actions/types';

const initialState = {
  products: [],
};

export default function _(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      state.products.push(action.payload);
      return { ...state };

    case INCREMENT_COUNTER_BY_POSITION:
      state.products[action.payload.ind] = { ...state.products[action.payload.ind], counter: state.products[action.payload.ind]?.counter + 1 }
      return { ...state }

    case DECREMENT_COUNTER_BY_POSITION:
      if (state.products[action.payload.ind].counter > 1) state.products[action.payload.ind] = { ...state.products[action.payload.ind], counter: state.products[action.payload.ind]?.counter - 1 }
      else if (state.products[action.payload.ind].counter === 1) { state.products.splice(action.payload.ind, 1) }
      return { ...state }
 
    case UPDATE_SETTINGS:
      // Getting a match for settings to update     
      state.products[action.payload.ind].setting = { ...state.products[action.payload.ind].setting, ...action.payload.setting }
      return { ...state }

    default:
      return state;
  }
}