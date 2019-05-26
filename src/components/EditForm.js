import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {updateArticle} from '../actions/article'
import {addNotification} from '../actions/notification'
import ArticleForm from './ArticleForm'

class EditArticle extends Component {
    handleLocalFormSubmit = (values) => {
        values = { ...values, category_id: parseInt(values.category_id) }
        this.props.updateArticle({
            articleId: this.props.match.params.id,
            updatedArticle: values, 
            afterSuccess: this.afterSuccess, 
            afterFailure: this.afterFailure 
        })
    }

    afterSuccess = () => {
        this.props.history.push(`/article/${this.props.match.params.id}`)
        this.props.addNotification({ message: 'Updated article successfully' });
    }
    
    afterFailure = () => {
        this.props.addNotification({ message: 'Failed to update the article', type: 'error' });        
    }
    
    render() {
        return (
            <ArticleForm {...this.props} type="edit" onFormSubmit={this.handleLocalFormSubmit}/>
        )
    }
}

export default compose(
    withRouter,
    connect(null, { updateArticle, addNotification })
)(EditArticle)