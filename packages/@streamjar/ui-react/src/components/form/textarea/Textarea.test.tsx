import * as React from 'react';
import { mount } from 'enzyme';
import { Textarea } from './Textarea';

describe('Textarea', () => {
	test('it renders an textarea', () => {
		const textarea = mount(<Textarea title="Test Number"/>);

		console.log(textarea.debug());
	});
});
