import React from 'react';
import CategoryListWrapped, { CategoryList } from '../CategoryList';
import RedClick from '../RedClick';
import Root from '../behaviors/Root';
import {mount} from 'enzyme';

let categories;

beforeEach(() => {
    categories = [
        { id: 1, name: 'Sports' },
        { id: 2, name: 'Shopping' }
    ];
})


describe('Test CategoryList Wrapped by connect', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Root initialState={{ categories }}><CategoryListWrapped /></Root>)
    })

    afterEach(() => {
        wrapper.unmount();
    })
    
    it('should render correct text heading', () => {
        expect(wrapper.find('h2')).toHaveLength(1);
        expect(wrapper.find('h2').text()).toEqual('Categories');
    })
    
    it('should show up 2 Red Click components inside with correct content', () => {
        expect(wrapper.find(RedClick)).toHaveLength(2);
        expect(wrapper.find(RedClick).first().props().children).toEqual(categories[0].name)
        expect(wrapper.find(RedClick).at(1).props().children).toEqual(categories[1].name)
    })

    it('should call componentDidMount and fetch Categories', () => {
        const didMountSpy = jest.spyOn(CategoryList.prototype, 'componentDidMount');
        expect(typeof wrapper.find(CategoryList).first().prop('fetchCategories')).toEqual('function');
        wrapper = mount(<Root initialState={{ categories }}><CategoryListWrapped /></Root>)
        expect(didMountSpy).toHaveBeenCalled();
        didMountSpy.mockRestore();
    })
    
    it('should call handler as user click a category', () => {
        const instance = wrapper.find(CategoryList).first().instance();
        const handlerSpy = jest.spyOn(instance, 'handleCategoryClick');
        wrapper.find(RedClick).first().simulate('click'); 
        expect(handlerSpy).toHaveBeenCalledWith(categories[0].name);
        handlerSpy.mockRestore(); 
    })
})

describe('test purely original CategoryList', () => {
    let wrapper;

    afterEach(() => {
        wrapper.unmount();
    })
    
    it('should dispatch fetchCategories at didMount', () => {
        const [ fetchCategories ] = new Array(1).fill(jest.fn()); 
        const mockProps = { fetchCategories, categories }
        wrapper = mount(<CategoryList {...mockProps}/>);
        expect(wrapper.find(RedClick)).toHaveLength(2);
        expect(fetchCategories).toHaveBeenCalled();
    })

    it('should dispatch selectCategory with correct args at click event', () => {
        const [ selectCategory, fetchCategories ] = new Array(2).fill(jest.fn()); 
        const mockProps = { selectCategory, categories, fetchCategories }
        wrapper = mount(<CategoryList {...mockProps}/>);
        wrapper.find(RedClick).first().simulate('click');
        expect(selectCategory).toHaveBeenCalledWith(categories[0].name);
    })
})