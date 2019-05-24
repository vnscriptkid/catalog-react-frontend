import React, { Component } from 'react';
import {connect} from 'react-redux'
import GeneralLink from './GeneralLink';
import * as actions from '../actions/category';

class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleCategoryClick = (categoryName, e) => {
        this.props.selectCategory(categoryName);
    }
    
    render() { 
        return ( <div className="pr-5 border-right">
            <h2>Categories</h2>
            <div className="d-flex flex-column">
                {this.props.categories.map(({ name, id }) => 
                    <GeneralLink bold={(name === this.props.selectedCategory).toString()} onClick={() => this.handleCategoryClick(name)} key={id}>{name}</GeneralLink>)
                }
            </div>
        </div> );
    }
}

const mapStateToProps = ({ categories, selectedCategory }) => ({
    categories,
    selectedCategory
})
 
export default connect(mapStateToProps, { ...actions })(CategoryList);