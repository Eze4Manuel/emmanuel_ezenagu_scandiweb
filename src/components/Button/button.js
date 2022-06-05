import React from 'react';
import './button.scss';

export class Button extends React.Component {
    render() {
        return (
            
                 <button disabled={this.props.disabled}  className='button' style={this.props.disabled ? {"opacity": "0.5"} : null} onClick={this.props.clicked}>{this.props.value}</button>
         )
    }
}


export class ButtonHollow extends React.Component {
    render() {
        return (
                 <button  className='button-hollow' onClick={this.props.clicked}>{this.props.value}</button>
         )
    }
} 
