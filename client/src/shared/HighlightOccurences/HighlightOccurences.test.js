import React from 'react';
import { shallow } from 'enzyme';

import { testPropTypes } from '../../testHelpers';
import { HighlightOccurences } from './HighlightOccurences';

const makeWrapper = ({ term = 'b', children = 'aba' } = {}) => shallow(<HighlightOccurences term={term} children={children} />);

describe('HighlightOccurences', () => {

    it('matches the snapshot', () => {
        const wrapper = makeWrapper();

        expect(wrapper).toMatchSnapshot();
    });

    it('requires "term" number prop', () => {
        testPropTypes(
            HighlightOccurences,
            'term',
            ['a', 'ASASASASAS', ''],
            [123, null, undefined]
        );
    });

    it('accepts "children" string prop', () => {
        testPropTypes(
            HighlightOccurences,
            'children',
            ['ad sd fsd f sdf sdf sdfsd', 'FFFFF!@#$%^&*()_', '', null, undefined],
            [123, <i></i>],
            { term: 'a' }
        );
    });

    it('properly highlights occurences', () => {
        [
            { term: 'b', children: 'aba', expected: 'a<mark>b</mark>a'},
            { term: 'b', children: 'aBa', expected: 'a<mark>B</mark>a'},
            { term: 'B', children: 'aba', expected: 'a<mark>b</mark>a'},
            { term: 'b', children: 'abba', expected: 'a<mark>b</mark><mark>b</mark>a'},
            { term: 'asd', children: 'asd', expected: '<mark>asd</mark>'},
            { term: '\\_+.', children: 'a\\_+.a', expected: 'a<mark>\\_+.</mark>a'},
            { term: 'b b', children: 'ab ba', expected: 'a<mark>b b</mark>a'},
            { term: 'x', children: 'ab ba', expected: 'ab ba'},
        ].forEach(({ term, children, expected }) => {
            const wrapper = makeWrapper({ term, children });

            expect(wrapper.html()).toEqual(`<span>${expected}</span>`);
        });
    });

});