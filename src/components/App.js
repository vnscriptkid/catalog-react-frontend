import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header';
import GeneralView from './GeneralView';
import WhitePage from './WhitePage';
import ArticleDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';
import DeleteConfirm from './DeleteConfirm';
import NotFound from './NotFound';
import Login from './Login';
import Notification from './Notification';
import RouteChangeListener from './RouteChangeListener';
import EditForm from './EditForm';
import Signup from './Signup';
import UnAuthOnly from './UnAuthOnly';
import LoggedInRequired from './LoggedInRequired';

class App extends Component {

    render() {
        return (<div>
                <BrowserRouter>
            <RouteChangeListener>
                    <Header />
                    <Notification />
                    <div className="container my-4">
                        <WhitePage>
                            <Switch>
                                <Route path="/" exact component={GeneralView} />
                                <Route path="/login" render={() => <UnAuthOnly><Login /></UnAuthOnly>} />
                                <Route path="/register" render={() => <UnAuthOnly><Signup /></UnAuthOnly>} />
                                <Route path="/article/new" render={() => <LoggedInRequired><ArticleForm /></LoggedInRequired>} />
                                <Route path="/article/:id/edit" component={EditForm} />
                                <Route path="/article/:id/delete" component={DeleteConfirm} />
                                <Route path="/article/:id" component={ArticleDetail} />
                                <NotFound path="/notfound"/>
                            </Switch>
                        </WhitePage>
                    </div>
            </RouteChangeListener>
                </BrowserRouter>
        </div>);
    }
}

export default App;