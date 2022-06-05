
import React from 'react';
import './item.scss';
import { Link } from 'react-router-dom';
import cartWhite from '../../assets/images/cart-white.png'; // with import   
import { connect } from 'react-redux';
import { HeadingText, ParagraphText } from '../../components/Text/text';

class Item extends React.Component {
    render() {
        return (
            <div className='Item' id={this.props.data.id} >
                {!this.props.data.inStock ? <HeadingText value={"Out of Stock"} styles={{ "fontWeight": "400", "fontSize": "24px", "position": "relative", "top": "35%" }} /> : null}
                <Link to={`/product_details?id=${this.props.data.id}`}>
                    <div className='item-container' style={!this.props.data.inStock ? { "opacity": "0.3" } : null}>
                        <div
                            className='item-image'
                            style={{ backgroundImage: `url(${this.props.data.gallery[0]})` }}>
                        </div>
                        <span className='cart'>
                            <img src={cartWhite} alt="" />
                        </span>
                        <HeadingText value={this.props.data.name} styles={{ "fontSize": "18px", "margin": "20px 0px 5px 0px", "textAlign": "left", "fontWeight": "300", "paddingLeft": "10px" }} />
                        <div>
                            <div><ParagraphText value={
                                this.props.data.prices.find((elem) => {
                                    return (elem.currency.symbol === this.props.selectedCurrency.state)
                                }).currency.symbol
                                + " " +
                                this.props.data.prices.find((elem) => {
                                    return (elem.currency.symbol === this.props.selectedCurrency.state)
                                }).amount
                            } styles={{ "fontSize": "18px", "fontWeight": "bold", "marginBottom": "10px", "marginTop": "0px", "paddingLeft": "10px" }} />
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
});

export default connect(
    mapStateToProps
)(Item);