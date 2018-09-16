let rootOutlet: HTMLElement;

export const getRootOutlet = () => {
	if (!rootOutlet) {
		const root = document.createElement('div');
		root.className = 'jar-outlet';

		document.body.appendChild(root);

		rootOutlet = root;
	}

	return rootOutlet;
};

export const getOutletRef = (): HTMLElement => {
	const root = document.createElement('div');
	root.className = 'jar-outlet-component';

	getRootOutlet().appendChild(root);

	return root;
};
