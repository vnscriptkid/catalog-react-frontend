import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux';
import * as articleActions from '../actions/article'
import * as notificationActions from '../actions/notification'

class DeleteConfirm extends Component {

    handleDeleteClick = () => {
        this.props.deleteArticle({articleId: this.props.match.params.id, followingFn: this.afterDeleteSuccess});
    }

    afterDeleteSuccess = () => {
        this.props.history.push('/') 
        this.props.addNotification({ message: 'Deleted Successfully' })
    }

    componentDidMount = () => {
        if (!this.props.article) {
            this.props.fetchSingleArticle({id: this.props.match.params.id});
        }
    }
    
    render() { 
        return ( <Fragment>
            <h3>Delete Item</h3>
            <p>Are you sure you want to delete?</p>
            <button onClick={this.handleDeleteClick} className="btn btn-outline-danger">I'm sure</button>
        </Fragment> );
    }
}
 
export default compose(
    connect(({ articles }, props) => ({ article: articles[props.match.params.id] }), { ...articleActions, ...notificationActions }),
)(DeleteConfirm);