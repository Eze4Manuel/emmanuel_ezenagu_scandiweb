import React from 'react';
import './product_details.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { Button } from '../../components/Button/button';
import { BorderedBlock, ColoredBlock } from '../../components/CardBlock/cardBlock';
import { HeadingText, ParagraphText, InsertParagraphText } from '../../components/Text/text';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      setting: {}
    }
  }
   
  handleOptionSelect = (elem) => {
    this.setState((prevState) => {
      return { setting: { ...prevState.setting, ...elem } }
    }) 
  }
  handleAddToCart = () => {
    // first checking if item is already in cart otherwise add it
    let productIndex = this.props.cart.products.findIndex((product)=>{
      return (product.product.id === this.props.data.product.id)
    });
    if(productIndex === -1) this.props.addToCart({ product: this.props.data.product, setting: this.state.setting, counter: 1 })
    else alert('Product Already in Cart')
  }


  render() {
    return (
      <div className='Product-details'>
        <div className='left-panel'>
          <div className='left-panel-list'>
            {
              this.props.data.product.gallery.map((elem) => {
                return <div key={uuidv4()} style={{ backgroundImage: `url(${elem})` }}></div>
              })
            }
          </div>
          <div className='left-panel-image'>
            <div style={{ backgroundImage: `url(${this.props.data.product.gallery[0]})` }}></div>
          </div>
        </div>

        <div className='right-panel'>
          <div className='title'>
            <HeadingText value={this.props.data.product.brand} styles={{ "fontSize": "30px", "marginBottom": "0px" }} />
            <HeadingText value={this.props.data.product.name} styles={{ "fontSize": "30px", "marginTop": "0px" }} />
          </div>
          <div className='size'>
            {
              this.props.data.product.attributes.map((elem) => {
                return (
                  <div key={uuidv4()}>
                    <HeadingText value={elem.name} styles={{ "fontSize": "18px" }} />
                    <div>
                      <ul>
                        {
                          (elem.id === 'Color') ?
                            elem.items.map((item) => {                          
                              return <ColoredBlock key={item.id} id={item.id} clicked={(e) => this.handleOptionSelect({ [elem.id]: item })} class={ (this.state.setting[elem.name]?.id === item.id) ? "box-colored-selected" : 'box-colored'} styles={{ "backgroundColor": `${item.value}` }} />
                            })
                            :
                            elem.items.map((item) => {
                              return <BorderedBlock key={item.id} id={item.id} clicked={(e) => { this.handleOptionSelect({ [elem.id]: item }) }} class={this.state.setting[elem.name]?.id === item.id ? 'borderedSelected' : 'bordered'} value={item.value} />
                            })
                        }
                      </ul>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='price'>
            <span>
              <HeadingText value={'Price:'} styles={{ "fontSize": "18px" }} />
            </span>
            <span>
              <div>
                <div><ParagraphText value={
                  this.props.data.product.prices.find((elem) => {
                    return (elem.currency.symbol === this.props.selectedCurrency.state)
                  }).currency.symbol
                  + " " +
                  this.props.data.product.prices.find((elem) => {
                    return (elem.currency.symbol === this.props.selectedCurrency.state)
                  }).amount
                } styles={{ "fontSize": "24px", "fontWeight": "bold" }} /></div>
              </div>
            </span>
          </div>
          <Button 
            disabled={!this.props.data.product.inStock} 
            value={"ADD TO CART"} 
            clicked={this.handleAddToCart } 
            />
          <InsertParagraphText className='info' value={this.props.data.product.description} styles={{ "fontSize": "18px", "marginTop": "10px" }} />        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,

});

export default connect(mapStateToProps, { addToCart })(ProductDetails);