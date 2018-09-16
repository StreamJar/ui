import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getOutletRef, getRootOutlet } from './outlet';

export interface IPortalState {
	ref: HTMLElement;
}

export class Portal extends React.PureComponent<{}, IPortalState> {

	constructor(props: {}) {
		super(props);

		this.state = {
			ref: getOutletRef(),
		};
	}

	public componentWillUnmount(): void {
		getRootOutlet().removeChild(this.state.ref);
	}

	public render(): JSX.Element {
		const { children } = this.props;
		const { ref } = this.state;

		return ReactDOM.createPortal(
			children,
			ref,
		);
	}
}
