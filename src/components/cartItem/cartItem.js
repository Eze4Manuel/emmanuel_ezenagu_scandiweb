import React from 'react';
import { BorderedBlock, ColoredBlock } from '../../components/CardBlock/cardBlock';
import { HeadingText } from '../../components/Text/text';
import { v4 as uuidv4 } from 'uuid';
import './cartItem.scss'
import backward from '../../assets/images/backward.png'; // with import    
import forward from '../../assets/images/forward.png'; // with import    

class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            totalImages: 1,
            currentImage: 0
        }
    }
    componentDidMount() {
        this.setState(() => {
            return { totalImages: this.props.data.product.gallery.length }
        })
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
            <div className='Cartitem'>
                <div className='cartitem-container'>
                    <div className='cartitem-content'>
                        <div>
                            <HeadingText value={this.props.data.product.brand} styles={{ "fontSize": "20px", "fontWeight": "300", "marginBottom": "0px" }} />
                            <HeadingText value={this.props.data.product.name} styles={{ "fontSize": "20px", "fontWeight": "300", "marginTop": "0px" }} />
                        </div>
                        <div>
                            <span><b>
                                {
                                    this.props.data.product.prices.find((elem) => {
                                        return (elem.currency.symbol === this.props.selectedCurrency.state)
                                    }).currency.symbol
                                    + " " +
                                    this.props.data.product.prices.find((elem) => {
                                        return (elem.currency.symbol === this.props.selectedCurrency.state)
                                    }).amount
                                }
                            </b></span>
                        </div>
                        <div className='size'>
                            {
                                this.props.data.product.attributes.map((elem) => {
                                    return (
                                        <div key={uuidv4()}>
                                            <HeadingText value={elem.name} styles={{ "fontSize": "16px", "fontWeight": "500" }} />
                                            <div>
                                                <ul>
                                                    {
                                                        (elem.id === 'Color') ?
                                                            elem.items.map((item) => {
                                                                return <ColoredBlock key={item.id} id={item.id} clicked={(e) => this.props.updateSettings(this.props.data.product.id, { [elem.id]: item })} class={(this.props.data.setting[elem.name]?.id === item.id) ? "box-colored-selected" : 'box-colored'} styles={{ "backgroundColor": `${item.value}` }} />
                                                            })
                                                            :
                                                            elem.items.map((item) => {
                                                                return <BorderedBlock key={item.id} id={item.id} clicked={(e) => { this.props.updateSettings(this.props.data.product.id, { [elem.id]: item }) }} class={this.props.data.setting[elem.name]?.id === item.id ? 'borderedSelected' : 'bordered'} value={item.value} />
                                                            })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='cartitem-counter'>
                        <div className='bordered' onClick={() => { this.props.incrementCounter(this.props.data.product.id, this.props.data.counter); this.props.culmulateSum() }}>+</div>
                        <div className='counter'>{this.props.data.counter}</div>
                        <div className='bordered' onClick={() => { this.props.decrementCounter(this.props.data.product.id, this.props.data.counter); this.props.culmulateSum() }}>-</div>
                    </div>
                    <div className='cartitem-image' style={{ backgroundImage: `url(${this.props.data.product.gallery[this.state.currentImage]})` }}>
                        <span onClick={() => this.previousImage()}><img src={backward} alt={''} /></span>
                        <span onClick={() => this.nextImage()}><img src={forward} alt={''}/></span>
                    </div>
                </div>
            </div>
        )
    }
}


export default CartItem;