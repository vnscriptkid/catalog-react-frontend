import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container">
                    <h1 className="display-4 text-light" href="#">Catalog App</h1>
                </div>
            </nav> 
        );
    }
}
 
export default Header;