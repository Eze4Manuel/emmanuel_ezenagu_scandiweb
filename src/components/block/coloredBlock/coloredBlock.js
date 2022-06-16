import React from 'react';
import './coloredBlock.scss';

class ColoredBlock extends React.Component {
    render() {
        return (
            <li id={this.props.id} onClick={this.props.clicked} className={this.props.class} style={this.props.styles}></li>
        )
    }
}
export default ColoredBlock;

