import { SELECTED_CURRENCY } from './types';

export const changeSelectedCurrency = (currency) => dispatch => {
     dispatch({
        type: SELECTED_CURRENCY,
        payload: currency
    })
};
 