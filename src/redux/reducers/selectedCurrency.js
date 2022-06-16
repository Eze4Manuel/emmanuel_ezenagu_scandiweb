import { SELECTED_CURRENCY } from '../actions/types';

const initialState = '';

export default function _(state = initialState, action) {
  switch (action.type) {
    case SELECTED_CURRENCY:
      return {
        state: action.payload
      };
    default:
      return state;
  }
}