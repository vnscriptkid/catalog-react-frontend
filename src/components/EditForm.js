import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/article'; 
import * as categoryActions from '../actions/category'; 

class ArticleForm extends Component {

    state = {
        title: this.props.article && this.props.article.title,
        body: this.props.article && this.props.article.body,
        categoryId: this.props.article && this.props.article.category.id
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: name !== "categoryId" ? value : parseInt(value) })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editArticle({ articleId: this.props.articleId, updatedArticle: this.state })
    }

    componentDidMount() {
        if (!this.props.categories.length) this.props.fetchCategories();
        if (!this.props.article) this.props.fetchSingleArticle(this.props.match.params.id);
    }

    render() {
        const { title, body, categoryId } = this.state.article || {};
        return (<form className="col-lg-10 mx-auto" onSubmit={this.handleSubmit}>
            <h3>Edit Article</h3>
            <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input name="title" value={title} type="text" onChange={this.handleInputChange} className="form-control" id="titleInput" />
            </div>
            <div className="form-group">
                <label htmlFor="bodyInput">Body</label>
                <textarea name="body" value={body} type="text" onChange={this.handleInputChange} rows="5" className="form-control" id="bodyInput" >{body}</textarea>
            </div>
            <div className="form-group">
                <label>Select Category</label>
                <select className="form-control" name="category" defaultValue={categoryId} onChange={this.handleInputChange}>
                    {this.props.categories.map(({ name, id }) => (
                        <option value={id} key={id}>{name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>);
    }
}

const mapStateToProps = ({ articles, categories }, props) => ({
    article: articles[props.match.params.id],
    categories
})

export default connect(mapStateToProps, { ...actions, ...categoryActions })(ArticleForm);