import React, { Component } from 'react';

class WhitePage extends Component {
    
    render() { 
        return ( <div className="border p-4">
            {this.props.children}
        </div>);
    }
}
 
export default WhitePage;