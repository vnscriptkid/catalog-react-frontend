import React, { Component } from 'react';
import CategoryList from './CategoryList';
import ArticleList from './ArticleList';

class GeneralView extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="d-flex">
                <div className="w-30">
                    <CategoryList />
                </div>
                <div className="w-70">
                    <ArticleList />
                </div>
            </div>
        );
    }
}
 
export default GeneralView;