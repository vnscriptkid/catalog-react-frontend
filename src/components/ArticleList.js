import React, { Component } from 'react';
import GeneralLink from './GeneralLink';
import MutedText from './MutedText';

class ArticleList extends Component {
    state = {  }
    render() { 
        return (  
            <div className="pl-5">
                <h2>Latest Items</h2>
                <div className="d-flex flex-column">
                    {Array(10).fill(null).map(ele => <GeneralLink to={'/article/1'}>Basket Ball <MutedText>(Volleyball)</MutedText></GeneralLink>)}
                </div>
            </div>
        );
    }
}
 
export default ArticleList;