import React, { Component } from 'react';

class Login extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mx-auto" style={{ maxWidth: 600 }}>
                {this.props.children}
                <button type="submit" className="btn btn-success btn-block">Log In</button>
            </form>
        );
    }
}

export default Login;