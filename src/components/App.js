import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header';
import GeneralView from './GeneralView';
import WhitePage from './WhitePage';
import ArticleDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';
import DeleteConfirm from './DeleteConfirm';
import UserForm from './UserForm';
import InputField from './InputField';
import NotFound from './NotFound';
import Login from './Login';
import Notification from './Notification';
import RouteChangeListener from './RouteChangeListener';

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
                                <Route path="/login" component={Login} />
                                <Route path="/register" render={() => <UserForm>
                                    <InputField label="User Name" />
                                    <InputField label="Password" type="password" />
                                    <InputField label="First Name" />
                                    <InputField label="Last Name" />
                                </UserForm>} />
                                <Route path="/article/new" component={ArticleForm} />
                                <Route path="/article/:id/edit" component={ArticleForm} />
                                <Route path="/article/:id/delete" component={DeleteConfirm} />
                                <Route path="/article/:id" component={ArticleDetail} />
                                <NotFound />
                            </Switch>
                        </WhitePage>
                    </div>
            </RouteChangeListener>
                </BrowserRouter>
        </div>);
    }
}

export default App;