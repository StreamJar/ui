import * as React from 'react';
import { mount } from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
	test('it renders a button', () => {
		const btn = mount(<Button>Test</Button>);

		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').prop('data-colour')).toBe('primary');

		// Check we're rendering a real button
		expect(btn.childAt(0).type()).toBe('button');
	});

	test('it renders a variant', () => {
		const btn = mount(<Button colour="danger">Test</Button>);

		// Check the variant is applied
		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').prop('data-colour')).toBe('danger');
	});

	test('it renders a button with an icon', () => {
		const btn = mount(<Button icon="star">Test</Button>);

		expect(btn.find('.jar-icon').text()).toBe('star');
		expect(btn.find('.jar-button__text').text()).toBe('Test');
		expect(btn.find('.jar-button__text').hasClass('jar-button__text-hasIcon')).toBe(true);
	});

	test('it renders a button with an icon on the right', () => {
		const btn = mount(<Button icon="star" iconRight={true}>Test</Button>);

		expect(btn.find('.jar-icon').text()).toBe('star');
		expect(btn.find('.jar-button__text').text()).toBe('Test');
		expect(btn.find('.jar-button__text').hasClass('jar-button__text-hasIcon')).toBe(true);
		expect(btn.find('.jar-button__content').hasClass('right')).toBe(true);
	});

	test('it renders a round button', () => {
		const invalidRound = mount(<Button round={true}>Test</Button>);
		const validRound = mount(<Button round={true} icon="star">Test</Button>);

		// Check it ignores round
		expect(invalidRound.text()).toBe('Test');
		expect(invalidRound.find('.jar-button').hasClass('jar-button-icon')).toBe(false);

		// Check it's still rendering an icon
		expect(validRound.text()).toBe('star');
		expect(validRound.find('.jar-button').hasClass('jar-button-icon')).toBe(true);
	});

	test('it renders a raised button', () => {
		const btn = mount(<Button raised={true}>Test</Button>);

		// Check it's styled as a raised button
		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').hasClass('jar-button-raised')).toBe(true);
	});

	test('it disables', () => {
		const btn = mount(<Button disabled={true}>Test</Button>);

		// Check it's styled normally
		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').hasClass('jar-button-disabled')).toBe(true);

		// Check the root button is disabled
		expect(btn.childAt(0).type()).toBe('button');
		expect(btn.childAt(0).prop('disabled')).toBe(true);
	});

	test('it accepts different types', () => {
		const btn = mount(<Button type="button">Test</Button>);

		expect(btn.text()).toBe('Test');

		expect(btn.childAt(0).type()).toBe('button');
		expect(btn.childAt(0).prop('type')).toBe('button');
	});

	test('it handles a click', () => {
		const fn = jest.fn();
		const btn = mount(<Button onClick={fn}> hi </Button>);

		btn.simulate('click');

		expect(fn).toBeCalledTimes(1);
	});

	test('it doesnt click when disabled', () => {
		const fn = jest.fn();
		const btn = mount(<Button disabled={true} onClick={fn}> hi </Button>);

		btn.simulate('click');

		expect(fn).toBeCalledTimes(0);
	});
});
