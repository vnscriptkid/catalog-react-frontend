import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
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
    
    render() { 
        return ( <Fragment>
            <h3>Delete Item</h3>
            <p>Are you sure you want to delete?</p>
            <button onClick={this.handleDeleteClick} className="btn btn-outline-danger">I'm sure</button>
        </Fragment> );
    }
}
 
export default connect(null, { ...articleActions, ...notificationActions })(DeleteConfirm);