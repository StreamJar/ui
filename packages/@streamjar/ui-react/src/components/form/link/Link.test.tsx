import * as React from 'react';
import { mount } from 'enzyme';
import { Link } from './Link';

describe('Link', () => {
	test('it renders a link', () => {
		const btn = mount(<Link>Test</Link>);

		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').prop('data-colour')).toBe('primary');

		// Check we're rendering a real button
		expect(btn.childAt(0).type()).toBe('a');
	});

	test('it renders a variant', () => {
		const btn = mount(<Link colour="danger">Test</Link>);

		// Check the variant is applied
		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').prop('data-colour')).toBe('danger');
	});

	test('it renders a link with an icon', () => {
		const btn = mount(<Link icon="star">Test</Link>);

		expect(btn.find('.jar-icon').text()).toBe('star');
		expect(btn.find('.jar-button__text').text()).toBe('Test');
		expect(btn.find('.jar-button__text').hasClass('jar-button__text-hasIcon')).toBe(true);
	});

	test('it renders a button with an icon on the right', () => {
		const btn = mount(<Link icon="star" iconRight={true}>Test</Link>);

		expect(btn.find('.jar-icon').text()).toBe('star');
		expect(btn.find('.jar-button__text').text()).toBe('Test');
		expect(btn.find('.jar-button__text').hasClass('jar-button__text-hasIcon')).toBe(true);
		expect(btn.find('.jar-button__content').hasClass('right')).toBe(true);
	});

	test('it renders a round button', () => {
		const invalidRound = mount(<Link round={true}>Test</Link>);
		const validRound = mount(<Link round={true} icon="star">Test</Link>);

		// Check it ignores round
		expect(invalidRound.text()).toBe('Test');
		expect(invalidRound.find('.jar-button').hasClass('jar-button-icon')).toBe(false);

		// Check it's still rendering an icon
		expect(validRound.text()).toBe('star');
		expect(validRound.find('.jar-button').hasClass('jar-button-icon')).toBe(true);
	});

	test('it renders a raised button', () => {
		const btn = mount(<Link raised={true}>Test</Link>);

		// Check it's styled as a raised button
		expect(btn.text()).toBe('Test');
		expect(btn.find('.jar-button').hasClass('jar-button-raised')).toBe(true);
	});

	test('it accepts different types', () => {
		const btn = mount(<Link type="button">Test</Link>);

		expect(btn.text()).toBe('Test');

		expect(btn.childAt(0).type()).toBe('a');
		expect(btn.childAt(0).prop('type')).toBe('button');
	});

	test('it handles a click', () => {
		const fn = jest.fn();
		const btn = mount(<Link onClick={fn}> hi </Link>);

		btn.simulate('click');

		expect(fn).toBeCalledTimes(1);
	});
});
