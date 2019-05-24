import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as authActions from '../actions/auth';
import * as notificationActions from '../actions/notification';

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state;
        this.props.login({username, password, followSuccess: this.afterLoginSuccess, followFailure: this.afterLoginFailure});
    }

    afterLoginSuccess = () => {
        this.props.history.push('/');
        this.props.addNotification({ message: 'Login successfully' })
    }

    afterLoginFailure = (message) => {
        this.props.addNotification({ type: 'error', message })
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
 
export default connect(null, { ...authActions, ...notificationActions })(Login);