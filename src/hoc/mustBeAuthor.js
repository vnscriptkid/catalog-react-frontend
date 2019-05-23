import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (Comp) => {
    class Wrapper extends Component {

        componentWillMount() {
            if (!this.props.isAuth || this.props.author.username !== this.props.currentUser) 
                return this.props.history.push('/');
        }
        
        render() {
            return <Comp {...this.props}/>
        }
    }

    const mapStateToProps = ({ auth }) => ({ isAuth: !!auth, currentUser: auth.username })

    return connect(mapStateToProps)(Wrapper);
}