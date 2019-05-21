import React, { Component, Fragment } from 'react';

class DeleteConfirm extends Component {
    render() { 
        return ( <Fragment>
            <h3>Delete Item</h3>
            <p>Are you sure you want to delete?</p>
            <button>Submit</button>
        </Fragment> );
    }
}
 
export default DeleteConfirm;