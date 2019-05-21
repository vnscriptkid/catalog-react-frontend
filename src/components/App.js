import React, { Component } from 'react';
import Header from './Header';
import GeneralView from './GeneralView';
import WhitePage from './WhitePage';
import ArticleDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';
import DeleteConfirm from './DeleteConfirm';

class App extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Header />
            <div className="container my-4">
                <WhitePage>
                    <GeneralView />
                </WhitePage>
                <WhitePage>
                    <ArticleDetail />
                </WhitePage>
                <WhitePage>
                    <ArticleForm />
                </WhitePage>
                <WhitePage>
                    <DeleteConfirm />
                </WhitePage>
            </div>
        </div> );
    }
}
 
export default App;