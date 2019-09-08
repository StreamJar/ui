import * as React from 'react';
import { mount } from 'enzyme';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
	test('it renders a radio and group', () => {
		const radio = mount((
			<RadioGroup name="magicGroup">
				<Radio value="yes">Yes</Radio>
				<Radio value="no">No</Radio>
			</RadioGroup>
		));

		expect(radio.find('.jar-radio input')).toHaveLength(2);
		expect(radio.find('.jar-radio-checked')).toHaveLength(0);
		expect(radio.find('.jar-radio__label').at(0).text()).toBe('Yes');
		expect(radio.find('.jar-radio__label').at(1).text()).toBe('No');
	});

	test('handles a default value', () => {
		const radio = mount((
			<RadioGroup name="magicGroup" value={'no'}>
				<Radio value="yes">Yes</Radio>
				<Radio value="no">No</Radio>
			</RadioGroup>
		));

		expect(radio.find('.jar-radio input')).toHaveLength(2);
		expect(radio.find('.jar-radio-checked')).toHaveLength(1);
		expect(radio.find('.jar-radio').at(0).hasClass('jar-radio-checked')).toBe(false);
		expect(radio.find('.jar-radio').at(1).hasClass('jar-radio-checked')).toBe(true);
	});

	test('handles focus', () => {
		const radio = mount((
			<RadioGroup name="magicGroup" value={'no'}>
				<Radio value="yes">Yes</Radio>
				<Radio value="no">No</Radio>
			</RadioGroup>
		));

		radio.find('input').at(0).simulate('focus');

		expect(radio.find('.jar-radio').at(0).hasClass('jar-radio-focused')).toBe(true);
		expect(radio.find('.jar-radio').at(1).hasClass('jar-radio-focused')).toBe(false);
	});

	test('handles blur', () => {
		const radio = mount((
			<RadioGroup name="magicGroup">
				<Radio value="yes">Yes</Radio>
				<Radio value="no">No</Radio>
			</RadioGroup>
		));

		radio.find('input').at(0).simulate('focus');

		expect(radio.find('.jar-radio').at(0).hasClass('jar-radio-focused')).toBe(true);
		expect(radio.find('.jar-radio').at(1).hasClass('jar-radio-focused')).toBe(false);

		radio.find('input').at(0).simulate('blur');

		expect(radio.find('.jar-radio').at(0).hasClass('jar-radio-focused')).toBe(false);
		expect(radio.find('.jar-radio').at(1).hasClass('jar-radio-focused')).toBe(false);
	});

	test('handles value change', () => {
		const fn = jest.fn();
		const radio = mount((
			<RadioGroup name="magicGroup" onChange={fn}>
				<Radio value="yes">Yes</Radio>
				<Radio value="no">No</Radio>
			</RadioGroup>
		));

		radio.find('input').at(1).simulate('change');

		expect(radio.find('.jar-radio').at(0).hasClass('jar-radio-checked')).toBe(false);
		expect(radio.find('.jar-radio').at(1).hasClass('jar-radio-checked')).toBe(true);

		expect(fn).toBeCalledWith('no');

		fn.mockReset();
	});
});
