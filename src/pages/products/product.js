import React from 'react';
import './product.scss';
import Item from '../../components/item/item'
import { v4 as uuidv4 } from 'uuid';
import { HeadingText } from '../../components/Text/text';

class Product extends React.Component {
    render() {
        return (
            <div className='Products'>
                <div className='title-container'>
                    <HeadingText value={this.props.data.category.name} styles={{ "fontSize": "42px", "textTransform": "capitalize", "textAlign": "left", "fontWeight": "400" }} />
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