import * as React from 'react';
import { mount } from 'enzyme';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	test('it renders a checkbox', () => {
		const checkbox = mount(<Checkbox>Test Checkbox</Checkbox>);

		expect(checkbox.find('.jar-checkbox-label').text()).toBe('Test Checkbox');
		expect(checkbox.find('.jar-checkbox-inner').childAt(0).type()).toBe('input');
	});

	test('handles a default value', () => {
		const checkbox = mount(<Checkbox value={true}>Test Checkbox</Checkbox>);

		expect(checkbox.find('input').prop('checked')).toBe(true);
		expect(checkbox.find('.jar-checkbox-inner').hasClass('jar-checkbox-inner-checked')).toBe(true);
	});

	test('handles focus', () => {
		const checkbox = mount(<Checkbox>test</Checkbox>);
		checkbox.find('input').simulate('focus');

		expect(checkbox.find('.jar-checkbox').hasClass('jar-checkbox-focused')).toBe(true);
	});

	test('handles blur (on targetable layer)', () => {
		const checkbox = mount(<Checkbox>test</Checkbox>);
		checkbox.find('.jar-checkbox').simulate('focus');

		expect(checkbox.find('.jar-checkbox').hasClass('jar-checkbox-focused')).toBe(true);

		checkbox.find('.jar-checkbox').simulate('blur');

		expect(checkbox.find('.jar-checkbox').hasClass('jar-checkbox-focused')).toBe(false);
	});

	test('handles blur (on input)', () => {
		const checkbox = mount(<Checkbox>test</Checkbox>);
		checkbox.find('input').simulate('focus');

		expect(checkbox.find('.jar-checkbox').hasClass('jar-checkbox-focused')).toBe(true);

		checkbox.find('input').simulate('blur');

		expect(checkbox.find('.jar-checkbox').hasClass('jar-checkbox-focused')).toBe(false);
	});

	test('handles value change', () => {
		const fn = jest.fn();
		const checkbox = mount(<Checkbox value={true} onChange={fn}>test</Checkbox>);
		expect(checkbox.find('.jar-checkbox-inner').hasClass('jar-checkbox-inner-checked')).toBe(true);

		// So, I'd like to test the checkbox is clicked, but enzyme
		// doesnt trigger a change when clicked through the DOM, which is a pita.
		checkbox.find('.jar-checkbox input').simulate('change', { target: { checked: false }});

		expect(checkbox.find('.jar-checkbox-inner').hasClass('jar-checkbox-inner-checked')).toBe(false);

		expect(fn).toBeCalledWith(false);

		fn.mockReset();

		checkbox.find('.jar-checkbox input').simulate('change', { target: { checked: true }});
		expect(checkbox.find('.jar-checkbox-inner').hasClass('jar-checkbox-inner-checked')).toBe(true);
		expect(fn).toBeCalledWith(true);
	});
});
