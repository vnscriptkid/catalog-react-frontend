import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {
    state = {  }

    logInOrOut = () => <button className="btn btn-danger btn-lg">Sign Out</button>
    
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
 
export default Header;