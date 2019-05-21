import React, { Component } from 'react';
import {connect} from 'react-redux'
import GeneralLink from './GeneralLink';
import api from '../api/instance';

class CategoryList extends Component {

    state = {
        categories: []
    }

    async componentDidMount() {
        const response = await api.get('/categories');
        this.setState({ categories: response.data })
    }
    
    render() { 
        return ( <div className="pr-5 border-right">
            <h2>Categories</h2>
            <div className="d-flex flex-column">
                {/* {Array(10).fill(null).map(ele => <GeneralLink>Football</GeneralLink>)} */} 
                {this.state.categories.map(({ name, id }) => <GeneralLink key={id}>{name}</GeneralLink>)}
            </div>
        </div> );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories
})
 
export default connect(mapStateToProps, {  })(CategoryList);