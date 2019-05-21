import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GeneralLink extends Component {
    state = {  }
    render() { 
        return (<Link to={this.props.to}>
            <span className="text-danger lead">
                {this.props.children}
            </span>
        </Link>);
    }
}
 
export default GeneralLink;