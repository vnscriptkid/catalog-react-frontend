import React, { Component } from 'react';
import {connect} from 'react-redux';
import RedClick from './RedClick';
import {Link} from 'react-router-dom'
import {fetchArticles} from '../actions/article'
import MutedText from './MutedText';

export class ArticleList extends Component {
    componentDidMount() {
        this.props.fetchArticles()
    }

    renderHeading = () => {
        return this.props.selectedCategory ? <h2>{this.props.selectedCategory}</h2> : <h2>Latest Items</h2>
    }

    renderArticles = () => {
        let {selectedCategory, articles} = this.props;
        articles = selectedCategory ?
            articles.filter(article => article.category.name === selectedCategory)
            :
            articles;
            
        return articles.map(({ id, title, category }) => (
            <Link to={`/article/${id}`} key={id}>
                <RedClick>{title}<MutedText> ({category && category.name})</MutedText></RedClick>
            </Link>
        ));
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
    articles: Object.keys(articles).map(key => articles[key]),
    isAuth: auth && !!auth.token
}))
 
export default connect(mapStateToProps, { fetchArticles })(ArticleList);