import React, { Component } from 'react';
import {connect} from 'react-redux';

class ArticleForm extends Component {

    renderHeading = () => {
        return !this.props.article ? <h3>Create ur new Article</h3> : <h3>Edit Article</h3>
    }
    
    render() {
        return (<form className="col-lg-10 mx-auto">
            {this.renderHeading()}            
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Title</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">Body</label>
                <textarea type="text" rows="5" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div className="form-group">
                <label>Select Category</label>
                <select className="form-control"> 
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
                    <option>Default select</option>
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

const mapStateToProps = ({ articles }, props) => ({
    article: articles[props.match.params.id]
}) 

export default connect(mapStateToProps)(ArticleForm);