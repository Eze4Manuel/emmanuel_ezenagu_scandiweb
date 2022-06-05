
import React from 'react';
import './cart.scss';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { HeadingText, ParagraphText } from '../../components/Text/text';
import { incrementCounter, decrementCounter, updateSettings } from '../../redux/actions/cartActions';
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
                    <HeadingText value={`CART`} styles={{ "fontSize": "32px", "textAlign": "left", "fontWeight": "700", "marginBottom": "20px" }} />
                    {
                        this.props?.cart.products.map(elem => {
                            return <CartItem data={elem} key={uuidv4()} selectedCurrency={this.props.selectedCurrency} culmulateSum={this.culmulateSum} updateSettings={this.props.updateSettings} incrementCounter={this.props.incrementCounter} decrementCounter={this.props.decrementCounter} />
                        })
                    }
                    <div className='cart-bottom'>
                        <div>
                            <ParagraphText value={`Tax 21%: `} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "300", "display": "inline-block", "marginRight": "15px" }} />
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
                            <ParagraphText value={`Quantity: `} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "300", "display": "inline-block", "marginRight": "15px" }} />
                            <ParagraphText value={this.props?.cart.products.length} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700", "display": "inline-block", "marginRight": "15px" }} />
                        </div>
                        {
                            this.state.total.length > 0 ?
                                <span>
                                    <ParagraphText value={`Total: `} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700", "display": "inline-block", "marginRight": "15px" }} />
                                    <ParagraphText value={
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.currency.symbol)
                                        + " " +
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.amount).toFixed(2)
                                    }
                                        styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700", "display": "inline-block" }} />
                                </span>
                                :
                                <span>
                                    <ParagraphText value={`Total: `} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700", "display": "inline-block", "marginRight": "15px" }} />
                                    <ParagraphText value={`0`} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700", "display": "inline-block", "marginRight": "15px" }} />
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
export default connect(mapStateToProps, { incrementCounter, decrementCounter, updateSettings })(Cart);