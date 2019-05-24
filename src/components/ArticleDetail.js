import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as actions from '../actions/article';

class ArticleDetail extends Component {

    renderButtonsAuthorBased = () => {
        const {isAuth, article} = this.props;
        return isAuth && article && article.author.username === this.props.currentUser  ? (
            <div className="btn-group">
                <Link className="btn btn-dark" to={`/article/${article.id}/edit`}>Edit</Link>
                <Link className="btn btn-warning" to={`/article/${article.id}/delete`}>Delete</Link>
            </div>
        ) : null;
    }

    componentDidMount() {
        if (!this.props.article) {
            this.props.fetchSingleArticle({ id: this.props.match.params.id, followFailure: this.followFetchFailure })
        }
    }

    followFetchFailure = () => {
        this.props.history.push('/notfound');
    }

    renderTime(stringOfTime) {
        const date = stringOfTime.split('T')[0];
        const time = stringOfTime.split('T')[1].split('+')[0];
        return `on ${date} at ${time}`
    }

    render() { 
        const {title,body,author,created_at} = this.props.article || {};
        return (  
            <Fragment>
                <h3 className="text-dark">{title}</h3>
                <h6 className="text-muted">
                    Created By <span className="badge badge-info">@{author && author.username}</span> 
                    <span> {created_at && this.renderTime(created_at)}</span>
                </h6>
                <p>{body}</p>
                {this.renderButtonsAuthorBased()}
            </Fragment>
        );
    }
}
 
const mapStateToProps = ({ articles, auth }, props) => ({ 
    article: articles[props.match.params.id], 
    isAuth: auth && !!auth.token,
    currentUser: auth && auth.username 
})

export default connect(mapStateToProps, { ...actions })(ArticleDetail);