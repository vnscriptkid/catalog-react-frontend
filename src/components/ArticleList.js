import React, { Component } from 'react';
import {connect} from 'react-redux';
import GeneralLink from './GeneralLink';
import {Link} from 'react-router-dom'
import * as actions from '../actions/article'
import MutedText from './MutedText';

class ArticleList extends Component {
    componentDidMount() {
        this.props.fetchArticles()
    }

    renderHeading = () => {
        return this.props.selectedCategory ? <h2>{this.props.selectedCategory}</h2> : <h2>Latest Items</h2>
    }

    renderArticles = () => {
        const {selectedCategory, latest, articleList, articlesObject} = this.props;
        const result = selectedCategory ?
            articleList.filter(article => article.category.name === selectedCategory)
            :
            latest.map(articleId => articlesObject[articleId]);
        return Object.keys(articlesObject).length ? result.map(({ id, title, category }) => (
            <GeneralLink to={`/article/${id}`} key={id}>{title}<MutedText> ({category && category.name})</MutedText></GeneralLink>
        )) : null
    }

    renderAddingAuthBased = () => this.props.isAuth ?
        <Link to="/article/new" className="lead"><i className="fas fa-plus-circle"></i> Add ur new article</Link>
        : null;
    
    render() { 
        return (  
            <div className="pl-5">
                {this.renderAddingAuthBased()}
                {this.renderHeading()}
                <div className="d-flex flex-column">
                    {this.renderArticles()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (({ articles, selectedCategory, auth }) => ({ 
    selectedCategory, 
    latest: articles.latest, 
    articleList: Object.keys(articles.all).map(key => articles.all[key]),
    articlesObject: articles.all,
    isAuth: auth && !!auth.token
}))
 
export default connect(mapStateToProps, { ...actions })(ArticleList);