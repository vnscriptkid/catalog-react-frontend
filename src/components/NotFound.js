import React, { Component } from 'react';

class NotFound extends Component {
    state = {}
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                Page Not Found
            </div>
        );
    }
}

export default NotFound;