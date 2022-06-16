import React from 'react';
import './product.scss';
import Item from '../../components/item/item'
import { v4 as uuidv4 } from 'uuid';

class Product extends React.Component {
    render() {
        return (
            <div className='Products'>
                <div className='title-container'>
                    <h1 onClick={ this.props.clicked} className={this.props.class}> {this.props.data.category.name}</h1>
                </div>
                <div className='products-listing'>
                    {
                        this.props.data.category.products.map((elem) => {
                            return <Item data={elem} key={uuidv4()} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Product;