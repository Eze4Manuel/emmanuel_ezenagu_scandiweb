
import React from 'react';
import './currencyDropDown.scss';
import { v4 as uuidv4 } from 'uuid';
import { changeSelectedCurrency } from '../../redux/actions/selectedCurrency';
import { connect } from 'react-redux';

class CurrencyDropDown extends React.Component {
    render() {
        return (
            <div className='CurrencyDropDown'>
                <div className='currencyDropDown-container'>
                    <ul className='currencyItem-content'>
                        {
                            this.props.currencies.map(elem => {
                                return <li onClick={() => { this.props.selectCurrency(elem.symbol); this.props.changeSelectedCurrency(elem.symbol) }} key={uuidv4()}>{elem.symbol} {elem.label}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default connect(null, { changeSelectedCurrency })(CurrencyDropDown);


