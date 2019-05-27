import React from 'react';
import {ArticleForm} from '../ArticleForm';
import Root from '../behaviors/Root';
import {mount} from 'enzyme'
// import {BrowserRouter as Router, Link} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'

describe('test UnWrapped ArticleForm component with no initialValues', () => {
    let article, wrapper, mockProps, handleSubmit, onFormSubmit, categories, ArticleFormRedux;

    beforeEach(() => {
        article = { id: 1, title: 'liverpool', body: 'win cl 19', category_id: 1, created_at: '2019-05-23T15:13:19+00:00', author: { username: 'salah' } }
        onFormSubmit = jest.fn()
        handleSubmit = jest.fn()
        categories = [ { name: 'shopping', id: 1 } ]
        mockProps = { handleSubmit, categories, onFormSubmit }
        ArticleFormRedux = reduxForm({ form: 'articleForm', enableReinitialize: true, ...mockProps })(ArticleForm)
        wrapper = mount(<Root><ArticleFormRedux /></Root>) 
    })

    test('should render form correctly in case of adding form', () => {
        expect(wrapper.find(Field)).toHaveLength(3);
        expect(wrapper.find(ArticleForm)).toHaveLength(1);
        expect(wrapper.find('input').first().text()).toEqual("");
        expect(wrapper.find('textarea').first().text()).toEqual("");
        expect(wrapper.find('h3')).toHaveLength(1);
        expect(wrapper.find('h3').first().text()).toEqual('Create ur new Article');
        expect(wrapper.find('option')).toHaveLength(1);
        expect(wrapper.find('option').first().text()).toEqual(categories[0].name);
    })
    
    test('should populate form correctly in case of editing form', () => {
        ArticleFormRedux = reduxForm({ form: 'articleForm', enableReinitialize: true, ...mockProps, initialValues: article, type: 'edit' })(ArticleForm)
        wrapper = mount(<Root><ArticleFormRedux /></Root>) 
        // start assertions
        expect(wrapper.find(ArticleForm)).toHaveLength(1);
        expect(wrapper.find('h3').first().text()).toEqual('Edit Article');
        expect(wrapper.find(ArticleForm).prop('initialValues').title).toEqual(article.title);
        expect(wrapper.find(ArticleForm).prop('initialValues').body).toEqual(article.body);
        expect(wrapper.find('textarea').first().text()).toEqual(article.body);
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input').first().props().value).toEqual(article.title);
        // button submit should be disabled by default
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
        expect(wrapper.find('button[type="submit"]').first().prop('disabled')).toEqual(true);
    })

    test('user interaction with the form', () => {
        ArticleFormRedux = reduxForm({ form: 'articleForm', enableReinitialize: true, ...mockProps, initialValues: article, type: 'edit' })(ArticleForm)
        wrapper = mount(<Root><ArticleFormRedux /></Root>)
        const instance = wrapper.find(ArticleForm).first().instance();
        let renderFieldSpy = jest.spyOn(instance, 'renderField');
        // interactions
        wrapper.find('input').first().simulate('change', { target: { value: 'updated' } })

        // assertions
        expect(wrapper.find('button[type="submit"]').first().prop('disabled')).toEqual(false);
        expect(renderFieldSpy).toHaveBeenCalledTimes(2);
        expect(wrapper.find('input').first().prop('value')).toEqual('updated');
        
        // clean up
        renderFieldSpy.mockRestore();
    })

    afterEach(() => {
        wrapper.unmount();
    })
});