import React, { Component } from 'react';

class RedClick extends Component {
    state = {  }
    render() {
        const addedClasses = this.props.bold && JSON.parse(this.props.bold) ? 'font-weight-bold': '';
        return (
            <span style={{ cursor: 'pointer' }} {...this.props} className={`text-danger lead ${addedClasses}`}>
                {this.props.children}
            </span>
        );
    }
}
 
export default RedClick;