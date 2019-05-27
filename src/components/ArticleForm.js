import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import FetchCategories from './behaviors/FetchCategories';
import _ from 'lodash';

const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Title required'
    if (!values.body) errors.body = 'Body required'
    return errors;
}

export class ArticleForm extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['edit', undefined, 'add']),
        onFormSubmit: PropTypes.func.isRequired
    }

    renderHeading = () => {
        return this.props.type === 'edit' ? <h3>Edit Article</h3> : <h3>Create ur new Article</h3>;
    }

    renderField = ({ input, label, type, meta: { touched, error }, rows }) => (
        <div className="form-group">
            <label htmlFor="titleInput">{label}</label>
            {type === "text" && <input className="form-control" {...input} type={type} />}
            {type === "textarea" && <textarea className="form-control" {...input} rows={rows} />}
            {touched && error && <h6 className="form-text text-danger">{error}</h6>}
        </div>
    )

    render() {
        const { handleSubmit, pristine, submitting, valid } = this.props;
        return (
            <FetchCategories>
                <form className="col-lg-10 mx-auto" onSubmit={handleSubmit(this.props.onFormSubmit)}>
                    {this.renderHeading()}
                    <Field name="title" label="Title" component={this.renderField} type="text" className="form-control" />
                    <Field name="body" label="Body" component={this.renderField} type="textarea" rows="5" className="form-control" />
                    <div className="form-group">
                        <Field className="form-control" name="category_id" component="select">
                            {this.props.categories.map(({ name, id }) => (
                                <option value={id} key={id}>{name}</option>
                            ))}
                        </Field>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={!valid || pristine || submitting} className="btn btn-primary btn-block">Submit</button>
                    </div>
                </form>
            </FetchCategories>
        );
    }
}

const mapStateToProps = ({ categories, articles }, props) => {
    let initialValuesEdit = {};
    if (props.type === 'edit') {
        let article = articles[props.match.params.id]
        if (article) {
            article = _.pick(article, ['title', 'body', 'category']);
            article['category_id'] = article.category.id;
            initialValuesEdit = _.omit(article, 'category');
        }
    }
    return {
        categories, 
        initialValues: { 
            category_id: (categories[0] && categories[0].id) || 1,
            ...initialValuesEdit
        } 
    }
}

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'articleForm', enableReinitialize: true, validate })
)(ArticleForm)