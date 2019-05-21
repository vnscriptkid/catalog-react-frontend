import React, { Component } from 'react';
import GeneralLink from './GeneralLink';

class CategoryList extends Component {
    render() { 
        return ( <div className="pr-5 border-right">
            <h2>Categories</h2>
            <div className="d-flex flex-column">
                {Array(10).fill(null).map(ele => <GeneralLink>Football</GeneralLink>)}
            </div>
        </div> );
    }
}
 
export default CategoryList;