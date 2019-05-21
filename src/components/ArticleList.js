import React, { Component } from 'react';
import GeneralLink from './GeneralLink';
import MutedText from './MutedText';
import api from '../api/instance'

class ArticleList extends Component {
    state = { articles: [] }

    async componentDidMount() {
        const response = await api('/articles');
        this.setState({ articles: response.data })
    }
    
    render() { 
        return (  
            <div className="pl-5">
                <h2>Latest Items</h2>
                <div className="d-flex flex-column">
                    {/* {Array(10).fill(null).map(ele => <GeneralLink to={'/article/1'}>Basket Ball <MutedText>(Volleyball)</MutedText></GeneralLink>)} */}
                    {this.state.articles.map(({ title, id }) => <GeneralLink to={`/article/${id}`} key={id}>{title}</GeneralLink>)}
                </div>
            </div>
        );
    }
}
 
export default ArticleList;