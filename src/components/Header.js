import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions/auth';

class Header extends Component {

    logInOrOut = () => {
        return this.props.isAuth ? (
        <div>
            <button className="btn btn-danger btn-lg">Log Out</button>
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

const mapStateToProps = ({ auth }) => ({ isAuth: !!auth })
 
export default connect(mapStateToProps, { ...actions })(Header);