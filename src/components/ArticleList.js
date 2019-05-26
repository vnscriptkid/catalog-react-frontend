import React, { Component } from 'react';
import {connect} from 'react-redux';
import RedClick from './RedClick';
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
        const {selectedCategory, articleList, articlesObject} = this.props;
        const result = selectedCategory ?
            articleList.filter(article => article.category.name === selectedCategory)
            :
            Object.keys(articlesObject).map(articleId => articlesObject[articleId]);
            
        return result.length ? result.map(({ id, title, category }) => (
            <Link to={`/article/${id}`} key={id}>
                <RedClick>{title}<MutedText> ({category && category.name})</MutedText></RedClick>
            </Link>
        )) : null
    }

    renderAddingAuthBased = () => this.props.isAuth ?
        <Link to="/article/new" className="lead"><i className="fas fa-plus-circle"></i> Add ur new article</Link>
        : null;
    
    render() { 
        return (  
            <div className="pl-5">
                {this.renderHeading()}
                {this.renderAddingAuthBased()}
                <div className="d-flex flex-column">
                    {this.renderArticles()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (({ articles, selectedCategory, auth }) => ({ 
    selectedCategory, 
    articleList: Object.keys(articles).map(key => articles[key]),
    articlesObject: articles,
    isAuth: auth && !!auth.token
}))
 
export default connect(mapStateToProps, { ...actions })(ArticleList);