import React from 'react';
import './cardBlock.scss';

export class BorderedBlock extends React.Component {
    render() {
        return (
            <li id={this.props.id} onClick={ this.props.clicked} className={this.props.class}>{this.props.value}</li>
        )
    }
}

export class ColoredBlock extends React.Component {
    render() {
        return (
            <li id={this.props.id} onClick={this.props.clicked} className={this.props.class} style={this.props.styles}></li>
        )
    }
}



