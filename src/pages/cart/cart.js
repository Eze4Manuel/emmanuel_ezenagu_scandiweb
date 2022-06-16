
import React from 'react';
import './cart.scss';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { incrementCounterByPosition, decrementCounterByPosition, updateSettings } from '../../redux/actions/cartActions';
import CartItem from '../../components/cartItem/cartItem'

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: []
        }
    }
    componentDidMount() {
        this.culmulateSum();
    }

    culmulateSum = () => {
        // Loops through all the products and cummulates the total of all prices
        const tot = [];
        this.props.cart.products.forEach((product, index) => {
            product.product.prices.map((price, ind) => {
                if (index !== 0) {
                    tot[ind] = { ...tot[ind], amount: tot[ind].amount + price.amount * product.counter }
                } else {
                    price = { ...price, amount: price.amount * product.counter }
                    tot.push(price);
                }
                return tot
            })
        })
        this.setState((prevState) => {
            return { total: [...tot] }
        })
    }

    render() {
        return (
            <div className='Cart'>
                <div className='cart-container'>
                    <h1>CART</h1>
                    {
                        this.props?.cart.products.map((elem, ind) => {
                            return <CartItem
                                data={elem}
                                index={ind}
                                key={uuidv4()}
                                selectedCurrency={this.props.selectedCurrency}
                                culmulateSum={this.culmulateSum}
                                updateSettings={this.props.updateSettings}
                                incrementCounterByPosition={this.props.incrementCounterByPosition}
                                decrementCounterByPosition={this.props.decrementCounterByPosition} />
                        })
                    }
                    <div className='cart-bottom'>
                        <div>
                            <p>Tax 21%:</p>

                            <span><b>
                                {
                                    this.state.total.length > 0 ?
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.currency.symbol ?? '')
                                        + " " +
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.amount * 0.21 ?? 0).toFixed(2)
                                        :
                                        0
                                }
                            </b>
                            </span>
                        </div>
                        <div>
                            <p>Quantity: </p>
                            <p> {this.props?.cart.products.length}</p>
                        </div>
                        {
                            this.state.total.length > 0 ?
                                <span>
                                    <p><b>Total: </b></p>
                                    <p> <b>
                                        {
                                            " " + (this.state.total.find((elem) => {
                                                return (elem.currency.symbol === this.props.selectedCurrency.state)
                                            })?.currency.symbol)
                                            + " " +
                                            (this.state.total.find((elem) => {
                                                return (elem.currency.symbol === this.props.selectedCurrency.state)
                                            })?.amount).toFixed(2)
                                        }
                                    </b></p>
                                </span>
                                :
                                <span>
                                    <p><b>Total: </b></p>
                                    <p><b> 0</b></p>
                                </span>
                        }
                        <div>
                            <button className='checkout-button'>ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedCurrency: state.selectedCurrency,
    cart: state.cart,
});
export default connect(mapStateToProps, { incrementCounterByPosition, decrementCounterByPosition, updateSettings })(Cart);