import { Component } from 'react';
import {connect} from 'react-redux'
import {fetchCategories} from '../../actions/category'

class FetchCategories extends Component {

    componentDidMount() {
        if (!this.props.categories.length) {
            this.props.fetchCategories()
        }
    }
    
    render() {  
        return this.props.children;
    }
}
 
export default connect(({ categories }) => ({ categories }), { fetchCategories })(FetchCategories);