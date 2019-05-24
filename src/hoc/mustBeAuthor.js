import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (Comp) => {
    class AuthorRequired extends Component {

        static propTypes = {
            history: PropTypes.object.isRequired,
            isAuth: PropTypes.bool.isRequired,
            currentUser: PropTypes.string,
            article: PropTypes.object 
        }

        componentDidMount() {
            this.checkAuthor();
        }

        componentDidUpdate() {
            this.checkAuthor();
        }

        checkAuthor = () => {
            if (!this.props.isAuth) this.exit();
            if (this.props.article && this.props.article.author.username !== this.props.currentUser) {
                this.exit();
            }
        }

        exit = () => {
            this.props.history.push('/');
        }
        
        render() {
            return <Comp {...this.props}/>
        }
    }

    const mapStateToProps = ({ auth, articles }, props) => ({ 
        isAuth: !!auth.token, 
        currentUser: auth.username, 
        article: articles[props.match.params.id]  
    })

    return connect(mapStateToProps)(AuthorRequired);
}