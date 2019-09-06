import * as React from 'react';
import { mount } from 'enzyme';
import { Input } from './Input';

describe('Input', () => {
	test('it renders an input', () => {
		const input = mount(<Input type="number" title="Test Number"/>);

		console.log(input.debug());
	});
});
