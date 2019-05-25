import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import {fetchSingleArticle} from '../actions/article'

class MustBeAuthor extends Component {
    
    render() { 
        return this.props.children;
    }

    componentDidMount() {
        const {isAuth, match, fetchSingleArticle, article} = this.props;
        if (!isAuth || !match.params) this.exit();
        if (!article) {
            fetchSingleArticle({
                id: match.params.id,
                followFailure: this.afterArticleFetchingFailure
            })
        } else {
            this.checkAuthor();
        }
    }

    componentDidUpdate() {
        this.checkAuthor();
    }

    checkAuthor = () => {
        const {article, currentUser} = this.props;
        if (article.author.username !== currentUser) {
            this.exit();
        }
    }

    afterArticleFetchingFailure = () => {
        this.exit();
    }

    exit = () => {
        this.props.history.push('/');
    }
}
 
export default compose(
    connect(({ auth, articles }, props) => ({ 
        isAuth: !!auth.token, 
        article: articles[props.match.params.id],
        currentUser: auth.username
    }), { fetchSingleArticle }),
    withRouter
)(MustBeAuthor);