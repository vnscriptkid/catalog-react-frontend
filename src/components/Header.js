import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions/auth';
import * as notificationActions from '../actions/notification';

class Header extends Component {

    logInOrOut = () => {
        return this.props.isAuth ? (
        <div>
            <button onClick={this.handleLogout} className="btn btn-danger btn-lg">Log Out</button>
        </div>
        )
            :
        (
            <div>
                <Link to="/register" className="btn btn-danger btn-lg">Register</Link>
                <Link to="/login" className="btn btn-outline-danger btn-lg ml-3">Sign In</Link>
            </div>
        )
    }

    handleLogout = () => {
        // eslint-disable-next-line no-restricted-globals
        const yes = confirm('Are your sure to log out?')
        if (yes) {
            this.props.logout()
            this.props.addNotification({ message: 'Logged out successfully!' })
        }
    }
    
    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container">
                <Link to="/"><h1 className="display-4 text-light" href="#">Catalog App</h1></Link>
                    {this.logInOrOut()}
                </div>
            </nav> 
        );
    }
}

const mapStateToProps = ({ auth }) => ({ isAuth: auth && auth.token })
 
export default connect(mapStateToProps, { ...actions, ...notificationActions })(Header);