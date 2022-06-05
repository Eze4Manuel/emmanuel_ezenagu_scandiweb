import React from 'react';
import './text.scss';

export class ParagraphText extends React.Component {
    render() {
        return (
            <p style={this.props.styles} onClick={ this.props.clicked} className={this.props.class}  >{this.props.value}</p>
        )
    }
}

export class InsertParagraphText extends React.Component {
    render() {
        return (
            <p style={this.props.styles} onClick={ this.props.clicked} className={this.props.class} dangerouslySetInnerHTML={{ __html: this.props.value }}></p>
        )
    }
}

export class HeadingText extends React.Component {
    render() {
        return (
            <h1 style={this.props.styles} onClick={ this.props.clicked} className={this.props.class}> {this.props.value}</h1>
        )
    }
}

 