import React from 'react';
import './mainContent.scss'
 
class MainContent extends React.Component {
    render() {
        return (
            <div className='main'>
                {this.props.children} 
            </div>
        )
    }
}

export default MainContent;