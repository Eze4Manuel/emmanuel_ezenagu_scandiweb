
import React from 'react';
import './dropCart.scss';
import { connect } from 'react-redux';
import { HeadingText, ParagraphText } from '../../components/Text/text';
import { Button, ButtonHollow } from '../../components/Button/button';
import { v4 as uuidv4 } from 'uuid';
import { incrementCounter, decrementCounter, updateSettings } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import CartItem from '../cartItem/cartItem'

class DropCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: []
        } 
    }
    componentDidMount() {
        this.culmulateSum();
    }

    culmulateSum = () => {
        // Loops through all the products and cummulates the total of all prices
        const total = [];
        this.props.cart.products.forEach((product, index) => {
            product.product.prices.map((price, ind) => {
                if (index !== 0) {
                    total[ind] = { ...total[ind], amount: total[ind].amount + price.amount * product.counter }
                } else {
                    price = { ...price, amount: price.amount * product.counter }
                    total.push(price);
                }
                return total
            })
        })
        this.setState((prevState) => {
            return { total: [...total] }
        })
    }
    render() {
        return (
            <div className='Dropcart' open>
                <div className='dropcart-container'>
                    <HeadingText value={` My Bag, ${this.props?.cart.products.length} Items`} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "600" }} />
                    {
                        this.props?.cart.products.map(elem => {
                            return <CartItem
                                data={elem} 
                                key={uuidv4()} 
                                selectedCurrency={this.props.selectedCurrency} 
                                culmulateSum={this.culmulateSum} 
                                updateSettings={this.props.updateSettings} 
                                incrementCounter={this.props.incrementCounter} 
                                decrementCounter={this.props.decrementCounter} 
                                />
                        })
                    }
                    <div className='dropcart-bottom'>
                        {
                            this.state.total.length > 0 ?
                                <div>
                                    <ParagraphText value={`Total`} styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700" }} />
                                    <ParagraphText value={
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.currency.symbol)
                                        + " " +
                                        (this.state.total.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        })?.amount).toFixed(2)
                                    }
                                        styles={{ "fontSize": "16px", "textAlign": "left", "fontWeight": "700" }} />
                                </div>
                                :
                                null
                        }
                        <div>
                            <Link to={`/cart`} onClick={() => this.props.showCart()} style={{ "width": "100%", "marginRight": "5px" }}>
                                <ButtonHollow value={"VIEW BAG"} />
                            </Link>
                            <Button value={"CHECKOUT"} />
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
export default connect(mapStateToProps, { incrementCounter, decrementCounter, updateSettings })(DropCart);;


