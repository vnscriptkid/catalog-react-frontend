import React from 'react';
import {ArticleDetail} from '../ArticleDetail';
import {mount} from 'enzyme'
import {BrowserRouter as Router, Link} from 'react-router-dom'

describe('test UnWrapped ArticleDetail component', () => {
    let article, wrapper, mockProps;

    beforeEach(() => {
        article = { id: 1, title: 'liverpool', body: 'win cl 19', created_at: '2019-05-23T15:13:19+00:00', author: { username: 'salah' } }
        mockProps = { article }
        wrapper = mount(<Router><ArticleDetail {...mockProps}/></Router>)
    })

    test('should render article correctly in case auth is not set', () => {
        expect(wrapper.find('h3.text-dark')).toHaveLength(1);
        expect(wrapper.find('h3.text-dark').first().text()).toEqual(article.title);
        expect(wrapper.find('h6.text-muted')).toHaveLength(1);
        expect(wrapper.find('h6.text-muted').first().text()).toContain('2019-05-23')
        expect(wrapper.find('p#articleBody')).toHaveLength(1);
        expect(wrapper.find('p#articleBody').first().text()).toEqual(article.body);
        expect(wrapper.find(Link)).toHaveLength(0);
    })

    test('should render buttons edit and delete in case user is authed and is author', () => {
        mockProps = { ...mockProps, isAuth: true, currentUser: 'salah' }
        wrapper = mount(<Router><ArticleDetail {...mockProps}/></Router>)
        expect(wrapper.find(Link)).toHaveLength(2);
        expect(wrapper.find(Link).first().text()).toEqual('Edit');
        expect(wrapper.find(Link).last().text()).toEqual('Delete');
    })

    afterEach(() => {
        wrapper.unmount();
    })
});