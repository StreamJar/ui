import * as React from 'react';
import { mount } from 'enzyme';
import { Textarea } from './Textarea';

describe('Textarea', () => {
	test('it renders an textarea', () => {
		const textarea = mount(<Textarea title="Test Number"/>);

		expect(textarea.find('.jar-input-label').text()).toBe('Test Number');
		expect(textarea.find('.jar-textarea').childAt(0).type()).toBe('textarea');
	});

	test('handles a value change', () => {
		const fn = jest.fn();

		const textarea = mount(<Textarea title="Test Number" onChange={fn} />);

		textarea.find('textarea').simulate('change', { target: { value: 'test'} });

		expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledWith('test');
	});

	test('handles auto resizing', () => {
		const fn = jest.fn();

		const textarea = mount(<Textarea title="Test Number" onChange={fn} resize={true} rows={1} />);
		expect(textarea.find('TextareaAutosizeClass')).toHaveLength(1);
	});
});
