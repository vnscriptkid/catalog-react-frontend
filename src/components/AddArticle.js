import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {createArticle} from '../actions/article'
import {addNotification} from '../actions/notification'
import ArticleForm from './ArticleForm'

class AddArticle extends Component {
    handleLocalFormSubmit = (values) => {
        values = { ...values, category_id: parseInt(values.category_id) }
        this.props.createArticle({ 
            article: values, 
            afterSuccess: this.afterSuccess, 
            afterFailure: this.afterFailure 
        })
    }

    afterSuccess = (article) => {
        this.props.history.push(`/article/${article.id}`)
        this.props.addNotification({ message: 'Created article successfully' });
    }
    
    afterFailure = () => {
        this.props.addNotification({ message: 'Can not create article', type: 'error' });        
    }
    
    render() {
        return (
            <ArticleForm type="add" onFormSubmit={this.handleLocalFormSubmit}/>
        )
    }
}

const mapStateToProps = ({ categories }) => ({ categories })

export default compose(
    withRouter,
    connect(mapStateToProps, { createArticle, addNotification })
)(AddArticle)