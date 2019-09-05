import * as React from 'react';
import { shallow } from 'enzyme';

import { Ripple } from './ripple';

describe('Ripple', () => {
	test('it doesnt explode', () => {
		expect(shallow(<Ripple />).contains(
			<div className="jar-ripple jar-ripple-bound mdc-ripple-surface" />,
		)).toBe(true);
	});

	test('supports unbounded', () => {
		expect(shallow(<Ripple unbounded={true} />).contains(
			<div className="jar-ripple jar-ripple-unbound mdc-ripple-surface" />,
		)).toBe(true);
	});
});
