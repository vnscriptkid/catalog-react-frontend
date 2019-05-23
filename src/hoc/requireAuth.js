import React, { Component } from 'react';
import { connect } from 'http2';

export default (Comp) => {
    class Wrapper extends Component {

        getSnapshotBeforeUpdate() {
            if (!this.props.isAuth) return this.props.history.push('/');
        }
        
        render() {
            return <Comp />
        }
    }

    const mapStateToProps = ({ auth }) => ({ isAuth: !!auth })

    return connect(mapStateToProps)(Wrapper);
}