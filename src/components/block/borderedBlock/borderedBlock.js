import React from 'react';
import './borderedBlock.scss';

class BorderedBlock extends React.Component {
    render() {
        return (
            <li id={this.props.id} onClick={ this.props.clicked} className={this.props.class}>{this.props.value}</li>
        )
    }
}
export default BorderedBlock;
