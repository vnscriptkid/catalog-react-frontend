import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux';
import * as actions from '../actions/notification'

class RouteChangeListener extends Component {

    componentDidMount() {
        this.props.history.listen(location => {
            if (this.props.message) {
                this.props.clearNotification();
            }
        })
    }
    
    render() { 
        return this.props.children;
    }
}

const mapStateToProps = ({ notification }) => ({
    message: notification.message
})

const WrappedByRouter = withRouter(RouteChangeListener);
 
export default connect(mapStateToProps, { ...actions })(WrappedByRouter);