import { combineReducers } from 'redux';
import selectedCurrency from './selectedCurrency';
import cart from './cartAction';

export default combineReducers({
  selectedCurrency: selectedCurrency,
  cart: cart
});