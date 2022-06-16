import React from 'react';
import './buttonHollow.scss';

class ButtonHollow extends React.Component {
    render() {
        return (
            <button className='button-hollow' onClick={this.props.clicked}>{this.props.value}</button>
        )
    }
} 
export default ButtonHollow;