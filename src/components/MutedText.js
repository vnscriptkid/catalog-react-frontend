import React, { Component } from 'react';

class MutedText extends Component {
    render() { 
        return ( <span className="text-muted font-italic" >{this.props.children}</span> );
    }
}
 
export default MutedText;