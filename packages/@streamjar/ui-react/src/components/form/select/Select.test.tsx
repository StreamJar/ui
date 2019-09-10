import * as React from 'react';
import { mount } from 'enzyme';

import { Select } from './Select';
import { SelectItem } from './SelectItem';

describe('Select', () => {
	it('renders a select', () => {
		const select = mount((
			<Select title="select">
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		expect(select.find('.jar-select')).toHaveLength(1);
		expect(select.find('.jar-select-item')).toHaveLength(0);
	});

	it('displays a dropdown', () => {
		const select = mount((
			<Select title="select">
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		select.find('.jar-select').simulate('click');

		expect(select.find('.jar-select-item')).toHaveLength(2);
		expect(select.find('.jar-select-item').at(0).find('.jar-select-item__value').text().trim()).toBe('one');
		expect(select.find('.jar-select-item').at(1).find('.jar-select-item__value').text().trim()).toBe('two');
	});

	it('handles default values', () => {
		const select = mount((
			<Select title="select" value="two">
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		select.find('.jar-select').simulate('click');

		expect(select.find('.jar-select__option').text().trim()).toBe('two');
	});

	test('handles focus', () => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two">
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));
		select.find('.jar-select').simulate('focus');

		expect(select.find('.jar-select').hasClass('jar-select-focus')).toBe(true);
		expect(fn).toHaveBeenCalled();
	});

	test('handles blur', () => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two">
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		select.find('.jar-select').simulate('focus');
		expect(select.find('.jar-select').hasClass('jar-select-focus')).toBe(true);

		select.find('.jar-select').simulate('blur');
		expect(select.find('.jar-select').hasClass('jar-select-focus')).toBe(false);

		expect(fn).toHaveBeenCalled();
	});

	it('selects a value', () => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two" onChange={fn}>
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		// Open drop down
		select.find('.jar-select').simulate('click');
		expect(select.find('.jar-select__option').text().trim()).toBe('two');

		// Select 'one'
		select.find('.jar-select-item').at(0).simulate('click');

		// check it's ok
		expect(select.find('.jar-select__option').text().trim()).toBe('one');
		expect(fn).toBeCalledWith('one');
	});

	it('handles multiple values', () => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two" multiple={true} onChange={fn}>
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		// Open drop down
		select.find('.jar-select').simulate('click');

		expect(select.find('.jar-select__items').text()).toBe('two');

		// Select 'one'
		select.find('.jar-select-item').at(0).simulate('click');

		// check it's ok
		expect(select.find('.jar-select__items').text()).toBe('twoone');
		expect(fn).toBeCalledWith(['two', 'one']);
	});

	it('handles deselection in multiple', () => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two" multiple={true} onChange={fn}>
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		// Open drop down
		select.find('.jar-select').simulate('click');

		expect(select.find('.jar-select__items').text()).toBe('two');

		// Select 'one'
		select.find('.jar-select-item').at(1).simulate('click');

		// check it's ok
		expect(select.find('.jar-select__items').text()).toBe('');
		expect(fn).toBeCalledWith([]);
	});

	it('handles search state', () => {
		const select = mount((
			<Select title="select" value="two" multiple={true} searching={true} search={true}>
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		// Open drop down
		select.find('.jar-select').simulate('click');

		// Check the items are hidden
		expect(select.find('.jar-select-item')).toHaveLength(0);
		expect(select.find('.jar-spinner')).toHaveLength(1);
	});

	it('updates search', (done) => {
		const fn = jest.fn();

		const select = mount((
			<Select title="select" value="two" multiple={true} onSearch={fn} search={true}>
				<SelectItem name="one" value="one" />
				<SelectItem name="two" value="two" />
			</Select>
		));

		// Open drop down
		select.find('.jar-select').simulate('click');
		select.find('input').at(0).simulate('change', { target: { value: 'test' }});

		// We need to wait since we debounce..
		setTimeout(() => {
			expect(fn).toBeCalledWith('test');
			done();
		},         250);
	}, 500);
});
