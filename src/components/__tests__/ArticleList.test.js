import React from 'react';
import {ArticleList} from '../ArticleList';
import {mount} from 'enzyme'
import RedClick from '../RedClick';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import MutedText from '../MutedText';

describe('test UnWrapped ArticleList component', () => {
    let articles, wrapper, mockProps, isAuth;
    let fetchArticles;
    
    beforeEach(() => {
        articles = [
            { id: 1, title: 'liverpool', category: { name: 'sports' } },
            { id: 2, title: 'jeans', category: { name: 'shopping' } }
        ]
        fetchArticles = jest.fn();
        isAuth = false;
        mockProps = { articles, fetchArticles, isAuth }
        wrapper = mount(<Router><ArticleList {...mockProps}/></Router>)
    })

    afterEach(() => {
        wrapper.unmount();
    })

    it('should render 2 articles with correct data', () => {
        expect(wrapper.find(RedClick)).toHaveLength(2);
        expect(wrapper.find(RedClick).first().props().children).toContain(articles[0].title)
        expect(wrapper.find(MutedText).first().props().children).toContain(articles[0].category.name);
        expect(wrapper.find(RedClick).at(1).props().children).toContain(articles[1].title)
        expect(wrapper.find(MutedText).at(1).props().children).toContain(articles[1].category.name);
        expect(wrapper.find(Link)).toHaveLength(2);
    })

    it('should call didMount once', () => {
        let didMountSpy = jest.spyOn(ArticleList.prototype, 'componentDidMount');
        wrapper = mount(<Router><ArticleList {...mockProps}/></Router>)
        expect(didMountSpy).toHaveBeenCalledTimes(1);
        didMountSpy.mockRestore();
    })

    it('should call fetchArticles once at first', () => {
        expect(fetchArticles).toHaveBeenCalledTimes(1);
    })

    it('should render one more Link to create article in case user is authed', () => {
        mockProps = { ...mockProps, isAuth: true }
        wrapper = mount(<Router><ArticleList {...mockProps}/></Router>)
        expect(wrapper.find(Link)).toHaveLength(3);
        expect(wrapper.find(Link).first().text()).toContain('Add ur new article');
    })
    
    it('should filter articles correctly in case selectedCategory is set', () => {
        mockProps = { ...mockProps, selectedCategory: 'shopping' };
        wrapper = mount(<Router><ArticleList {...mockProps}/></Router>)
        expect(wrapper.find(RedClick)).toHaveLength(1);
        expect(wrapper.find(RedClick).first().props().children).toContain(articles[1].title);
    })

})