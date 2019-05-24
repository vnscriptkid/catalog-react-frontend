import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class UnAuthOnly extends Component {
    
    render() { 
        if (this.props.isAuth) return <Redirect to="/"/>
        return this.props.children;
    }
}
 
const mapStateToProps = ({ auth }) => ({ isAuth: !!auth.token })

export default connect(mapStateToProps)(UnAuthOnly);