import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserFormWrapper extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    render() { 
        return (<div>
            <form onSubmit={this.props.onSubmit} className="mx-auto" style={{ maxWidth: 600 }}>
                {this.props.children}
            </form>
        </div>);
    }
}
 
export default UserFormWrapper;