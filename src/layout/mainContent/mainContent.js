import React from 'react';
 
class MainContent extends React.Component {
    render() {
        return (
            <div className='main' style={{"paddingTop": "70px"}}>
                {this.props.children} 
            </div>
        )
    }
}

export default MainContent;