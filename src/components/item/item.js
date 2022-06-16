
import React from 'react';
import './item.scss';
import { Link } from 'react-router-dom';
import cartWhite from '../../assets/images/cart-white.png'; // with import   
import { connect } from 'react-redux';
import { addToCart, incrementCounterByPosition } from '../../redux/actions/cartActions';

class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            setting: {}
        }
    }
    componentDidMount() {
        let tempObject = {}
        this.setPredefinedSettings(this.props.data).forEach(elem => {
            tempObject = { ...tempObject, ...elem }
        })
        this.setState((prevState) => {
            return {
                setting: tempObject
            }
        })
    }
    handleAddToCart = (e, data) => {
        e.preventDefault();
        
        // returns all products in the cart that has same id with the product clicked to be added to cart
        let existingProducts = this.props.cart.products.filter((product, ind) => {
            return (product.product.id === this.props.data.id)
        })
        // maps though existingProduct returning a transformed array object of product settings
        let mapSettingsProduct = existingProducts.map(product => {
            return product.setting
        })
        // returns true if there is no presence of the product with same attributes in cart
        let checkMatch = mapSettingsProduct.every((elem) => {
            return !(this.checkAttributeSettings(elem, this.state.setting));
        });
        // Add product to cart since product has unique attributes
        if (checkMatch) {
            this.props.addToCart({ product: this.props.data, setting: this.state.setting, counter: 1 })
        } else {
            // Since product already exist in the cart, increment at the position where the inserted object matches 
            let temp = this.props.cart.products.findIndex(product => {
                if ((product.product.id === this.props.data.id) && !(this.checkMatchAttributeSettings(product.setting, this.state.setting))) return true;
                else return false
            })
            this.props.incrementCounterByPosition(temp);
        }
    }
    setPredefinedSettings = (product) => {
        return product.attributes.map(elem => {
            return { [elem.name]: elem.items[0] }
        })
    }
    checkAttributeSettings = (obj1, obj2) => {
        let match = true;
        Object.keys(obj2).forEach(function (key) {
            if (obj2[key].id !== obj1[key].id) {
                match = false
            }
        });
        return match;
    }
    // checks if two objects have same id properties
    checkMatchAttributeSettings = (obj1, obj2) => {
        let match = true;
        Object.keys(obj2).forEach(function (key) {
            if (obj2[key].id === obj1[key].id) {
                match = false
            }
        });
        return match;
    }


    render() {
        return (
            <div className='Item' id={this.props.data.id} >

                {!this.props.data.inStock ? <h1>Out of Stock</h1> : null}
                <Link as='div' to={`/product_details?id=${this.props.data.id}`}>
                    <div className={`item-container ${!this.props.data.inStock ? 'translucent' : null}`}>
                        <div className='item-image'>
                            <img src={this.props.data.gallery[0]} alt='item_image' />
                        </div>
                        <span onClick={this.props.data.inStock ? (e) => this.handleAddToCart(e, this.props.data) : null} className='cart'>
                            <img src={cartWhite} alt="" />
                        </span>

                        <div className='item-name'>
                            <h1>{this.props.data.brand}</h1>
                            <h1>{this.props.data.name}</h1>
                        </div>
                        <div className='item-price'>
                            <div>
                                <p>
                                    {
                                        this.props.data.prices.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        }).currency.symbol
                                        + " " +
                                        this.props.data.prices.find((elem) => {
                                            return (elem.currency.symbol === this.props.selectedCurrency.state)
                                        }).amount
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedCurrency: state.selectedCurrency,
    cart: state.cart,
});

export default connect(
    mapStateToProps, { addToCart, incrementCounterByPosition }
)(Item);