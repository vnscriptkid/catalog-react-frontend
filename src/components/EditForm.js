import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import * as actions from '../actions/article'; 
import * as notificationActions from '../actions/notification'; 
import * as categoryActions from '../actions/category'; 
import mustBeAuthor from '../hoc/mustBeAuthor';
import {reduxForm, Field} from 'redux-form';
const _ = require('lodash');

const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Title required'
    if (!values.body) errors.body = 'Body required'
    return errors;
}

class EditForm extends Component {

    renderField = ({ input, label, type, meta: { touched, error }, rows }) => (
        <div className="form-group">
            <label htmlFor="titleInput">{label}</label>
            {type === "text" && <input className="form-control" {...input} type={type} />}
            {type === "textarea" && <textarea className="form-control" {...input} rows={rows} type={type} />}
            {touched && error && <h6 className="form-text text-danger">{error}</h6>}
        </div>
    )

    componentDidMount() {
        if (!this.props.categories.length) this.props.fetchCategories();
        if (!this.props.article) this.props.fetchSingleArticle({id: this.props.match.params.id});
    }

    handleLocalFormSubmit = (values) => {
        this.props.updateArticle({ 
            updatedArticle: values, 
            articleId: this.props.articleId, 
            afterSuccess: this.afterSuccess, 
            afterFailure: this.afterFailure 
        })
    }

    afterFailure = (error) => {
        console.log('afterFailure: ', error);
    }

    afterSuccess = () => {
        this.props.addNotification({ message: 'Updated article successfullly' })
    }

    render() {
        const { handleSubmit, pristine, submitting, valid } = this.props;
        return (<form className="col-lg-10 mx-auto" onSubmit={handleSubmit(this.handleLocalFormSubmit)}>
            <h3>Edit Article</h3>
                <Field name="title" label="Title" component={this.renderField} type="text" className="form-control" />
                <Field name="body" label="Body" component={this.renderField} type="textarea" rows="5" className="form-control" />
                <div className="form-group">
                    <Field className="form-control" name="category" component="select">
                        {this.props.categories.map(({ name, id }) => (
                            <option value={id} key={id}>{name}</option>
                            ))}
                    </Field>
                </div>
            <div className="form-group">
                <button type="submit" disabled={!valid || pristine || submitting} className="btn btn-primary btn-block">Submit</button>
            </div>
        </form>);
    }
}

const mapStateToProps = ({ articles, categories }, props) => {
    const article = articles[props.match.params.id];
    return {
        categories,
        articleId: article && article.id,
        initialValues: { ..._.pick(article, ['title', 'body', 'category']), category: article && article.category.id }
    }
}

export default compose(
    mustBeAuthor,
    connect(mapStateToProps, { ...actions, ...categoryActions, ...notificationActions }),    
    reduxForm({ form: 'articleEdit', enableReinitialize: true, validate }),
)(EditForm); 