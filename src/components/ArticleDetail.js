import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as actions from '../actions/article';

class ArticleDetail extends Component {
    state = {  }

    renderButtonsAuthBased = () => {
        return (
            <div className="btn-group">
                <Link className="btn btn-dark" to={'/article/1/edit'}>Edit</Link>
                <Link className="btn btn-warning" to={'/article/2/delete'}>Delete</Link>
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.article) {
            this.props.fetchArticles({ id: this.props.match.params.id })
        }
    }

    render() { 
        const {title,body} = this.props.article || {};
        return (  
            <Fragment>
                <h3 className="text-dark">{title}</h3>
                <p>{body}</p>
                {this.renderButtonsAuthBased()}
            </Fragment>
        );
    }
}
 
const mapStateToProps = ({ articles }, props) => ({ article: articles[props.match.params.id] })

export default connect(mapStateToProps, { ...actions })(ArticleDetail);