import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class GeneralLink extends Component {
    state = {  }
    render() { 
        return (<Link to={this.props.to} sub={}>
            <span className="text-warning">
                {this.props.children}
            </span>
        </Link>);
    }
}
 
export default GeneralLink;