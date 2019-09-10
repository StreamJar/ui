import { pullTo, IAnchorType, IAnchorSide, IAnchor, ITarget, IPosition, position } from './positioner';

export interface IPositionTest {
	name: string;
	test: {
		axis: 'horizontal' | 'vertical';
		pull: IAnchorSide;
		anchor: IAnchor;
		floatingTarget: ITarget;
		offset: number;
		pageOffset: number;
		window: { width: number; height: number };
	};

	expect: IPosition;
}
const positionTests: IPositionTest[] = [
	{
		name: 'force bottom',
		test: {
			axis: 'vertical',
			pull: 'center',
			anchor: { top: 10, left: 10, right: 60, bottom: 60, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 150, height: 150 },
		},
		expect: { left: 5, maxHeight: 80, top: 65 },
	},

	{
		name: 'space at bottom',
		test: {
			axis: 'vertical',
			pull: 'center',
			anchor: { top: 10, left: 10, right: 60, bottom: 60, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 200, height: 200 },
		},
		expect: { left: 5, maxHeight: 100, top: 65 },
	},

	{
		name: 'force bottom',
		test: {
			axis: 'horizontal',
			pull: 'center',
			anchor: { top: 10, left: 10, right: 60, bottom: 60, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 150, height: 150 },
		},
		expect: { top: 5, maxWidth: 80, left: 65 },
	},

	{
		name: 'space at right',
		test: {
			axis: 'horizontal',
			pull: 'center',
			anchor: { top: 10, left: 10, right: 60, bottom: 60, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 200, height: 200 },
		},
		expect: { top: 5, maxWidth: 130, left: 65 },
	},

	{
		name: 'top is prefered',
		test: {
			axis: 'vertical',
			pull: 'center',
			anchor: { top: 90, left: 90, right: 140, bottom: 140, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 200, height: 200 },
		},
		expect: { left: 65, maxHeight: 80, bottom: 115 },
	},

	{
		name: 'left is prefered',
		test: {
			axis: 'horizontal',
			pull: 'center',
			anchor: { top: 90, left: 90, right: 140, bottom: 140, height: 50, width: 50 },
			floatingTarget: {
				height: 100,
				width: 100,
			},
			offset: 5,
			pageOffset: 5,
			window: { width: 200, height: 200 },
		},
		expect: { top: 65, maxWidth: 80, right: 115 },
	},
];

describe('Positioner', () => {
	test('it pulls to the start', () => {
		expect(pullTo('start', 0, 100, 50)).toBe(0);
	});

	test('it pulls to the center', () => {
		expect(pullTo('center', 0, 100, 50)).toBe(25);
	});

	test('it pulls to the end', () => {
		expect(pullTo('end', 0, 100, 50)).toBe(50);
	});

	for (const testCase of positionTests) {
		test(`position: ${testCase.name}`, () => {
			expect(position(
				testCase.test.axis,
				testCase.test.pull,
				testCase.test.anchor,
				testCase.test.floatingTarget,
				testCase.test.offset,
				testCase.test.pageOffset,
				testCase.test.window,
			)).toEqual(testCase.expect);
		});
	}
});
