import { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class LoggedInRequired extends Component {
    
    componentDidMount() {
        this.checkAuth();
    }

    componentDidUpdate() {
        this.checkAuth();
    }

    checkAuth = () => {
        if (!this.props.isAuth) {
            this.props.history.push('/');
        }
    }
    
    render() {
        return this.props.children;
    }
}

export default compose(
    connect(({ auth }) => ({ isAuth: !!auth.token })),
    withRouter
)(LoggedInRequired)