import React, { Component } from 'react';

class ArticleForm extends Component {
    render() {
        return (<form>
            <h3>Edit Item</h3>
            <select class="form-control">
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
                <option>Default select</option>
            </select>
            <div class="form-group">
                <label for="formGroupExampleInput">Title</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput">Description</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" />
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>);
    }
}

export default ArticleForm;