import * as React from 'react';
import { mount } from 'enzyme';

import { Tooltip } from './Tooltip';
import { Button } from '../form/button';

describe('Tooltip', () => {
	it('renders, without issue', () => {
		const tooltip = mount(<Tooltip message="hmm"><Button> button </Button></Tooltip>);

		// 1 means we have just the tooltip, no portal
		expect(tooltip.children()).toHaveLength(1);
		expect(tooltip.find('button')).toHaveLength(1);
	});

	it('renders the tooltip', () => {
		const tooltip = mount(<Tooltip message="hmm"><Button> button </Button></Tooltip>);

		tooltip.find('button').getDOMNode().dispatchEvent(new MouseEvent('mouseover'));
		tooltip.update();

		expect(tooltip.find('.jar-tooltip').text().trim()).toBe('hmm');

		// 1 means we have just the tooltip, 2 includes a spooky portal
		expect(tooltip.children()).toHaveLength(2);
		expect(tooltip.find('button')).toHaveLength(1);
	});

	it('dismisses the tooltip', (done) => {
		const tooltip = mount(<Tooltip message="hmm"><Button> button </Button></Tooltip>);

		// Show the tooltip
		tooltip.find('button').getDOMNode().dispatchEvent(new MouseEvent('mouseover'));
		tooltip.update();

		expect(tooltip.find('.jar-tooltip').text().trim()).toBe('hmm');

		// 1 means we have just the tooltip, 2 includes a spooky portal
		expect(tooltip.children()).toHaveLength(2);
		expect(tooltip.find('button')).toHaveLength(1);

		// Hide the tooltip
		tooltip.find('button').getDOMNode().dispatchEvent(new MouseEvent('mouseleave'));
		tooltip.update();

		setTimeout(() => {
			tooltip.update();

			// 1 means we have just the tooltip, 2 includes a spooky portal
			expect(tooltip.children()).toHaveLength(1);
			expect(tooltip.find('button')).toHaveLength(1);
			done();
		},         200);
	}, 250);
});
