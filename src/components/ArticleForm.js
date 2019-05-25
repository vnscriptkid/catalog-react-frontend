import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import * as categoryActions from '../actions/category';
import * as articleActions from '../actions/article';

const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Title required'
    if (!values.body) errors.body = 'Body required'
    return errors;
}

class ArticleForm extends Component {

    renderHeading = () => {
        return !this.props.article ? <h3>Create ur new Article</h3> : <h3>Edit Article</h3>
    }

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
    }

    handleLocalFormSubmit = (values) => {
        const article = { ...values, category_id: parseInt(values.category) }
        this.props.createArticle({ article, afterSuccess: this.afterSuccess })
    }

    afterSuccess = (article) => {
        this.props.history.push(`/article/${article.id}`)
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


// export default connect(mapStateToProps)(ArticleForm);
export default compose(
    connect(({ categories }) => ({ categories }), { ...categoryActions, ...articleActions }),
    reduxForm({ form: 'articleEdit', enableReinitialize: true, validate })
)(ArticleForm)