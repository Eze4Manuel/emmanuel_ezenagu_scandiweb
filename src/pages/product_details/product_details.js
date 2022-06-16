import React from 'react';
import './product_details.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addToCart, incrementCounterByPosition } from '../../redux/actions/cartActions';
import Button from '../../components/button/button/button';
import BorderedBlock from '../../components/block/borderedBlock/borderedBlock';
import ColoredBlock from '../../components/block/coloredBlock/coloredBlock';
import backward from '../../assets/images/backward.png'; // with import    
import forward from '../../assets/images/forward.png'; // with import    
import parse from 'html-react-parser';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      setting: {},
      totalAttributes: 0,
      totalImages: 1,
      currentImage: 0
    }
  }
  componentDidMount() {
    this.setState(() => {
      return {
        totalImages: this.props.data.product.gallery.length,
        totalAttributes: this.props.data.product.attributes.length
      }
    })
  }
  handleOptionSelect = (elem) => {
    this.setState((prevState) => {
      return { setting: { ...prevState.setting, ...elem } }
    })
  }
  handleAddToCart = () => {
    // returns all products in the cart that has same id with the product clicked to be added to cart
    let existingProducts = this.props.cart.products.filter((product, ind) => {
      return ((product.product.id === this.props.data.product.id))
    })
    // maps though existingProduct returning a transformed array object
    let mapSettingsProduct = existingProducts.map(product => {
      return product.setting
    })
    let checkMatch = mapSettingsProduct.every((elem) => {
      return !(this.checkAttributeSettings(elem, this.state.setting));
    });

    if (checkMatch) {
      this.props.addToCart({ product: this.props.data.product, setting: this.state.setting, counter: 1 })
    } else {
      // Since product already exist in the cart, increment at the position where the inserted object matches 
      let temp = this.props.cart.products.findIndex(product => {
        if ((product.product.id === this.props.data.product.id) && (this.checkMatchAttributeSettings(product.setting, this.state.setting))) return true;
        else return false
      })
      this.props.incrementCounterByPosition(temp);
    }
  }

  // checks if two objects have same id properties
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
        if (match) match = true
      } else {
        match = false;
      }
    });
    return match;
  }

  // slider function to switch to the next image
  nextImage = () => {
    if (this.state.totalImages - 1 > this.state.currentImage) {
      this.setState((prevState) => {
        return { currentImage: prevState.currentImage + 1 }
      })
    }
  }
  // slider function to switch to the previous image
  previousImage = () => {
    if (this.state.currentImage !== 0) {
      this.setState((prevState) => {
        return { currentImage: prevState.currentImage - 1 }
      })
    }
  }

  render() {
    return (
      <div className='Product-details'>
        <div className='left-panel'>
          <div className='left-panel-list'>
            {
              this.props.data.product.gallery.map((elem) => (
                <div key={uuidv4()} className={!this.props.data.product.inStock ? 'translucent' : null} >
                  <div>
                    <img src={elem} alt='product_image' />
                  </div>
                </div>
              ))
            }
          </div>
          <div className='left-panel-image'>
            {!this.props.data.product.inStock ?
              <h1> Out of Stock</h1>
              : null}
            <div className={!this.props.data.product.inStock ? 'translucent' : null}>
              <div className='item-image'>
                <img src={this.props.data.product.gallery[this.state.currentImage]} alt='product_image' />
                {this.state.totalImages > 1 ?
                  <div className='ward_buttons'>
                    <span onClick={() => this.previousImage()}><img src={backward} alt={''} /></span>
                    <span onClick={() => this.nextImage()}><img src={forward} alt={''} /></span>
                  </div>
                  :
                  null
                }
              </div>
            </div>
          </div>
        </div>

        <div className='right-panel'>
          <div className='title'>
            <h1>{this.props.data.product.brand}</h1>
            <h1> {this.props.data.product.name}</h1>
          </div>
          <div className='size'>
            {
              this.props.data.product.attributes.map((elem) => {
                return (
                  <div key={uuidv4()}>
                    <h1> {elem.name}</h1>
                    <div>
                      <ul>
                        {
                          (elem.id === 'Color') ?
                            elem.items.map((item) => {
                              return <ColoredBlock key={item.id} id={item.id} clicked={(e) => this.handleOptionSelect({ [elem.id]: item })} class={(this.state.setting[elem.name]?.id === item.id) ? "box-colored-selected" : 'box-colored'} styles={{ "backgroundColor": `${item.value}` }} />
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
              <h1>Price:</h1>
            </span>
            <span>
              <div>
                <div>
                  <p>{
                    this.props.data.product.prices.find((elem) => {
                      return (elem.currency.symbol === this.props.selectedCurrency.state)
                    }).currency.symbol
                    + " " +
                    this.props.data.product.prices.find((elem) => {
                      return (elem.currency.symbol === this.props.selectedCurrency.state)
                    }).amount
                  }
                  </p>
                </div>
              </div>
            </span>
          </div>
          <div className="tooltip">
            <Button
              disabled={!this.props.data.product.inStock || (Object.keys(this.state.setting).length === this.state.totalAttributes ? false : true)}
              value={"ADD TO CART"}
              clicked={this.handleAddToCart}
            />
            {Object.keys(this.state.setting).length !== this.state.totalAttributes ? <span className="tooltiptext">{this.props.data.product.inStock ? "Select attributes to add to cart" : 'Product out of stock'}</span> : null}
          </div>
          <div className='info'>{parse(this.props.data.product.description)}</div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCart, incrementCounterByPosition })(ProductDetails);