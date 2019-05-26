import React, { Component } from 'react';
import { connect } from 'react-redux'
import RedClick from './RedClick';
import { fetchCategories, selectCategory } from '../actions/category';

export class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleCategoryClick = (categoryName, e) => {
        this.props.selectCategory(categoryName);
    }

    render() {
        return (
            <div className="pr-5 border-right">
                <h2>Categories</h2>
                <div className="d-flex flex-column">
                    {this.props.categories.map(({ name, id }) =>
                        <RedClick bold={(name === this.props.selectedCategory).toString()} onClick={() => this.handleCategoryClick(name)} key={id}>{name}</RedClick>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, selectedCategory }) => ({
    categories,
    selectedCategory
})

export default connect(mapStateToProps, { fetchCategories, selectCategory })(CategoryList);