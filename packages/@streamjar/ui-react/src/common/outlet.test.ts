import { getRootOutlet, getOutletRef, ROOT_OUTLET_REF } from './outlet';

describe('Outlet', () => {
	test('generates a div', () => {
		const root = getRootOutlet();

		expect(root.tagName).toBe('DIV');
		expect(root.className).toBe('jar-outlet');
	});

	test('generates the same div subsequently', () => {
		const rootA = getRootOutlet();
		const rootB = getRootOutlet();

		expect(rootA).toBe(rootB);
	});

	test('it adds a new div to the root', () => {
		const root = getRootOutlet();
		expect(root.querySelectorAll('.jar-outlet-component')).toHaveLength(0);

		const outlet = getOutletRef();

		expect(root.querySelectorAll('.jar-outlet-component')).toHaveLength(1);

		expect(root.querySelector('.jar-outlet-component')).toEqual(outlet);

		// cleanup.
		(<any>window)[ROOT_OUTLET_REF] = null;
		root.remove();
	});

	test('allows for multiple refs', () => {
		const root = getRootOutlet();
		expect(root.querySelectorAll('.jar-outlet-component')).toHaveLength(0);

		const a = getOutletRef();
		const b = getOutletRef();

		expect(a).not.toBe(b);
		expect(root.querySelectorAll('.jar-outlet-component')).toHaveLength(2);
	});
});
