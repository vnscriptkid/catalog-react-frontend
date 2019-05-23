import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleForm extends Component {

    state = {
        title: this.props.article && this.props.article.title,
        body: this.props.article && this.props.article.body,
        category: this.props.article && this.props.article.category.id
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: parseInt(value) })
    }

    render() {
        const { title, body, category } = this.state;
        return (<form className="col-lg-10 mx-auto">
            <h3>Edit Article</h3>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Title</label>
                <input name="title" value={title} type="text" onChange={this.handleInputChange} className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Body</label>
                <textarea name="body" value={body} type="text" onChange={this.handleInputChange} rows="5" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div className="form-group">
                <label>Select Category</label>
                <select className="form-control" name="category" value={category} onChange={this.handleInputChange}>
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
    article: articles.all[props.match.params.id],
    categories 
})

export default connect(mapStateToProps)(ArticleForm);