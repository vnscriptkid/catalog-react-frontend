import { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchSingleArticle} from '../../actions/article'
import {compose} from 'redux';

class FetchSingleArticle extends Component {

    componentDidMount() {
        if (!this.props.categories.length) {
            this.props.fetchSingleArticle({ 
                id: this.props.match.params.id, 
                followSuccess: this.afterFetchingSuccess,
                followFailure: this.afterFetchingFailure
            })
        }
    }

    afterFetchingFailure = () => {
        this.props.history.push('/');
    }
    
    render() {  
        return this.props.children;
    }
}
 
// export default connect(({ categories }, props) => ({ categories }), { fetchSingleArticle })(FetchSingleArticle);

export default compose(
    connect(({ categories }, props) => ({ categories }), { fetchSingleArticle }),
    withRouter
)(FetchSingleArticle)