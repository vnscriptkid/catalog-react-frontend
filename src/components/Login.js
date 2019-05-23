import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/auth';

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state;
        this.props.login({username, password, followFn: this.afterLoginSuccess});
    }

    afterLoginSuccess = () => {
        this.props.history.push('/');
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    
    render() { 
        return ( <form className="col-lg-6 mx-auto" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="usernameInput">Username</label>
                <input name="username" value={this.state.username} onChange={this.handleInputChange} type="text" className="form-control" id="usernameInput" />
            </div>
            <div className="form-group">
                <label htmlFor="usernameInput">Password</label>
                <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control" id="passwordInput" />
            </div>
            <button type="submit" className="btn btn-success btn-block">Log In</button>
        </form> );
    }
}
 
export default connect(null, { ...actions })(Login);