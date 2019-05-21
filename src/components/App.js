import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
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
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={GeneralView} />
                            <Route path="/article/new" component={ArticleForm} />
                            <Route path="/article/:id/edit" component={ArticleForm} />
                            <Route path="/article/:id/delete" component={DeleteConfirm} />
                            <Route path="/article/:id" component={ArticleDetail} />
                        </Switch>
                    </BrowserRouter>
                </WhitePage>
            </div>
        </div> );
    }
}
 
export default App;