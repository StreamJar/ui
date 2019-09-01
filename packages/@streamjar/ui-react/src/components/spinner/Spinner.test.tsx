import * as React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from './spinner';

describe('Spinner', () => {
	test('it renders with no props', () => {
		expect(shallow(<Spinner />).find('.jar-spinner-outer').prop('style')).toMatchObject({
			width: '50px',
			height: '50px',
		});
	});

	test('it renders with size prop', () => {
		expect(shallow(<Spinner size={100} />).find('.jar-spinner-outer').prop('style')).toMatchObject({
			width: '100px',
			height: '100px',
		});
	});
});
