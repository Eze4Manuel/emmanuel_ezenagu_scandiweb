import React from 'react';
import './button.scss';

class Button extends React.Component {
    render() {
        return (
            <button disabled={this.props.disabled}  className={`button ${this.props.disabled ? "translucent": null}`} onClick={this.props.clicked}>{this.props.value}</button>
        )
    }
}

export default Button;
