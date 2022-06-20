
import React from 'react';
import './dropCart.scss';
import { connect } from 'react-redux';
import Button from '../../components/button/button/button';
import ButtonHollow from '../../components/button/buttonHollow/buttonHollow';
import { v4 as uuidv4 } from 'uuid';
import { incrementCounterByPosition, decrementCounterByPosition, updateSettings } from '../../redux/actions/cartActions';
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
                <div className='dropcart-container' onClick={this.props.handleBubbleClick}>
                    <h1>{` My Bag, ${this.props?.cart.products.length} Item(s)`} </h1>
                    {
                        this.props?.cart.products.map((elem, ind) => {
                            return <CartItem
                                data={elem}
                                index={ind}
                                key={uuidv4()}
                                selectedCurrency={this.props.selectedCurrency}
                                culmulateSum={this.culmulateSum}
                                updateSettings={()=>{}}
                                incrementCounterByPosition={this.props.incrementCounterByPosition}
                                decrementCounterByPosition={this.props.decrementCounterByPosition}
                            />
                        })
                    }
                    <div className='dropcart-bottom'>
                        {
                            this.state.total.length > 0 ?
                                <div>
                                    <p><b>Total</b></p>
                                    <p><b>
                                        {
                                            (this.state.total.find((elem) => {
                                                return (elem.currency.symbol === this.props.selectedCurrency.state)
                                            })?.currency.symbol)
                                            + " " +
                                            (this.state.total.find((elem) => {
                                                return (elem.currency.symbol === this.props.selectedCurrency.state)
                                            })?.amount).toFixed(2)
                                        }
                                    </b></p>                                    
                                </div>
                                :
                                null
                        }
                        <div className='dropcart-bottom-button'>
                            <Link to={`/cart`} onClick={() => this.props.showCart()}>
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
export default connect(mapStateToProps, { incrementCounterByPosition, decrementCounterByPosition, updateSettings })(DropCart);;


