import React, { Component } from 'react';
import {connect} from 'react-redux'

class Notification extends Component {
    state = {  }
    render() { 
        const {message, type} = this.props;
        if (!message) return null;

        if (type === 'success')        
            return (<div className="alert alert-success text-center" role="alert">
                {this.props.message}
            </div>)
        if (type === 'error')
            return (<div className="alert alert-danger text-center" role="alert">
                {this.props.message}
            </div>)
    }
}

const mapStateToProps = ({ notification }) => ({
    message: notification.message,
    type: notification.type
})
 
export default connect(mapStateToProps, null)(Notification);