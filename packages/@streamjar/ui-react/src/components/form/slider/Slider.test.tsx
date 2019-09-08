import * as React from 'react';
import { mount } from 'enzyme';
import { Slider } from './Slider';

describe('Slider', () => {
	test('it renders a slider', () => {
		const slider = mount(<Slider />);

		expect(slider.find('input').prop('type')).toBe('range');
	});

	test('it changes the value', () => {
		const fn = jest.fn();
		const slider = mount(<Slider onChange={fn} />);

		slider.find('input').simulate('change', { target: { value: '10' }});
		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith(10);
	});
});
