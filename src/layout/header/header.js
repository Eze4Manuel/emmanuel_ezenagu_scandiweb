import React from 'react';
import './header.scss'
import logo from '../../assets/images/logo.png'; // with import    
import cart from '../../assets/images/cart.png'; // with import    
import arrow_down from '../../assets/images/arrow-down.png'; // with import  
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    render() {
        return (
            <div className='Header'>
                <div className='nav-left'>
                    <ul className='categories'>
                        {
                            this.props.categories.map(elem => (
                                <Link key={uuidv4()} to={`/${elem.name}`}>
                                    <li onClick={() => this.props.changeCategory(elem.name)}>
                                        {elem.name}
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
                <div className='nav-center'>
                    <img src={logo} alt='' />
                </div>
                <div className='nav-right'>
                    <div>
                        <ul onClick={() => this.props.showCurrency()}>
                            <li>$</li>
                            <li><img src={arrow_down} alt='' /></li>
                        </ul>
                        <span onClick={() => this.props.showCart()}>
                            <img src={cart} alt='' />
                            <span className="cart-badge">{this.props.cart.products.length}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    cart: state.cart,
});
export default connect(mapStateToProps, {})(Header);;