const ROOT_OUTLET_REF = Symbol('jar-root-outlet');

/**
 * Get a reference to the root outlet element
 */
export const getRootOutlet: () => HTMLDivElement = () => {
	if (!(<any>window)[ROOT_OUTLET_REF]) {
		const root = document.createElement('div');
		root.className = 'jar-outlet';

		document.body.appendChild(root);

		(<any>window)[ROOT_OUTLET_REF] = root; // tslint:disable-line
	}

	return (<any>window)[ROOT_OUTLET_REF];
};

/**
 * Create a new outlet reference
 */
export const getOutletRef = (): HTMLElement => {
	const root = document.createElement('div');
	root.className = 'jar-outlet-component';

	getRootOutlet().appendChild(root);

	return root;
};
