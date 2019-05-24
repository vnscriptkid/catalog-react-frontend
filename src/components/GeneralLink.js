import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GeneralLink extends Component {
    state = {  }
    render() {
        const addedClasses = this.props.bold && JSON.parse(this.props.bold) ? 'font-weight-bold': '';
        return (<Link to="#" {...this.props}>
            <span className={`text-danger lead ${addedClasses}`}>
                {this.props.children} 
            </span>
        </Link>);
    }
}
 
export default GeneralLink;