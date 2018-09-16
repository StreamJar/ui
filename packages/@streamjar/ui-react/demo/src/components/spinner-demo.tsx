import * as React from 'react';

import { Spinner } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class SpinnerDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Spinner',
		components: [{
			name: 'Spinner',
			props: [{
				name: 'size',
				default: '50',
				type: 'number',
				description: 'Size in pixels of the spinner',
			}],
		}],
		examples: `
<Spinner />
<Spinner size={10}/>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<Spinner />
				<Spinner size={10}/>
			</Demo>
		);
	}
}
