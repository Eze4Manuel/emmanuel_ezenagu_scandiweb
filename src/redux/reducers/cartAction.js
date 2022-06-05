import { ADD_TO_CART, INCREMENT_COUNTER, DECREMENT_COUNTER, UPDATE_SETTINGS } from '../actions/types';

const initialState = {
  products: [],
};

export default function _(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      state.products.push(action.payload);
      return { ...state };

    case INCREMENT_COUNTER:
      // Getting a match for counter increase
      let counterIncIndex = state.products.findIndex((product) => {
        return (product.product.id === action.payload.id)
      })
      state.products[counterIncIndex] = { ...state.products[counterIncIndex], counter: state.products[counterIncIndex]?.counter + 1 }
      return { ...state }

    case DECREMENT_COUNTER:
      // Getting a match for counter decrease
      let counterDecIndex = state.products.findIndex((product) => {
        return (product.product.id === action.payload.id)
      })
      // decreasing counter if it greater than 1 else remove item from product array
      if (state.products[counterDecIndex].counter > 1) state.products[counterDecIndex] = { ...state.products[counterDecIndex], counter: state.products[counterDecIndex]?.counter - 1 }
      else if(state.products[counterDecIndex].counter === 1) {state.products.splice(counterDecIndex, 1)}
      return { ...state }

    case UPDATE_SETTINGS:
      // Getting a match for settings to update
      let updateSettingIndex = state.products.findIndex((product) => {
        return (product.product.id === action.payload.id)
      })
      state.products[updateSettingIndex].setting = { ...state.products[updateSettingIndex].setting, ...action.payload.setting }
      return { ...state }

    default:
      return state;
  }
}