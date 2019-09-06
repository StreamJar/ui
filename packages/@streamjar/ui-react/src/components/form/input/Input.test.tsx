import * as React from 'react';
import { mount } from 'enzyme';
import { Input } from './Input';

describe('Input', () => {
	test('it renders an input', () => {
		const input = mount(<Input title="Test Number"/>);

		expect(input.find('.jar-input-label').text()).toBe('Test Number');
		expect(input.find('.jar-input__container').type()).toBe('input');
	});

	test('handles a value change', () => {
		const fn = jest.fn();

		const input = mount(<Input title="Test Number" onChange={fn} />);

		console.log(input.debug());
		input.find('input').simulate('change', { target: { value: 'test'} });

		expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledWith('test');
	});

	test('handles focus', () => {
		const fn = jest.fn();

		const input = mount(<Input title="Test Number" onFocus={fn} />);

		input.find('input').simulate('focus');

		expect(input.find('.jar-input').hasClass('jar-input-focus')).toBe(true);
		expect(fn).toHaveBeenCalled();
	});

	test('handles blur', () => {
		const fn = jest.fn();

		const input = mount(<Input title="Test Number" onBlur={fn} />);
		input.find('input').simulate('focus');
		expect(input.find('.jar-input').hasClass('jar-input-focus')).toBe(true);

		input.find('input').simulate('blur');
		expect(input.find('.jar-input').hasClass('jar-input-focus')).toBe(false);

		expect(fn).toHaveBeenCalled();
	});
});
