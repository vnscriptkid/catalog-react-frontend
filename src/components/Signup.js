import React, { Component } from 'react';
import * as authActions from '../actions/auth';
import * as notificationActions from '../actions/notification';
import {connect} from 'react-redux'

class Signup extends Component {
    state = {
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser({ ...this.state, afterSuccess: this.afterRegisterSuccess, afterFailure: this.afterRegisterFailure })
    }

    afterRegisterSuccess = () => {
        this.props.history.push('/login');
        this.props.addNotification({ message: 'Registered successfully. You can log in now!' })
    }

    afterRegisterFailure = (error) => {
        debugger;
        console.log('error: ', error);
        this.props.addNotification({ type: 'error', message: 'User register failed' });
    }

    render() {
        // TODO: reuse form sign up vs sign in vs article form
        return (
            <form className="col-lg-6 mx-auto" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor={'usernameInput'}>Username</label>
                    <input name="username" onChange={this.handleInputChange} type="text" className="form-control" id={'usernameInput'} />
                </div>
                <div className="form-group">
                    <label htmlFor={'usernameInput'}>Password</label>
                    <input name="password" onChange={this.handleInputChange} type="password" className="form-control" id={'passwordInput'} />
                </div>
                <div className="form-group">
                    <label htmlFor={'firstNameInput'}>First Name</label>
                    <input name="firstName" onChange={this.handleInputChange} type="text" className="form-control" id={'firstNameInput'} />
                </div>
                <div className="form-group">
                    <label htmlFor={'lastNameInput'}>Last Name</label>
                    <input name="lastName" onChange={this.handleInputChange} type="text" className="form-control" id={'lastNameInput'} />
                </div>
                <div className="form-group">
                    <button className="btn btn-success btn-block">Sign Up</button>
                </div>
            </form>
        );
    }
}

export default connect(null, { ...authActions, ...notificationActions })(Signup);