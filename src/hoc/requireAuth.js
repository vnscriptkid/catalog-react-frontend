import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (Comp) => {
    class Wrapper extends Component {

        componentWillMount() {
            if (!this.props.isAuth) return this.props.history.push('/');
        }
        
        render() {
            return <Comp {...this.props}/>
        }
    }

    const mapStateToProps = ({ auth }) => ({ isAuth: !!auth.token })

    return connect(mapStateToProps)(Wrapper);
}