import React, { Component } from 'react';

class Login extends Component {
    state = {}
    render() {
        return (
            <form className="mx-auto" style={{ maxWidth: 600 }}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                {this.props.children}
                <button type="submit" className="btn btn-success btn-block">Log In</button>
            </form>
        );
    }
}

export default Login;