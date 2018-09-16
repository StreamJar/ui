import * as React from 'react';

import { Popup } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class PopupDemo extends React.Component<{}, { anchor: HTMLButtonElement | null }> {
	public config: IDemoConfig = {
		name: 'Popup',
		components: [{
			name: 'Popup',
			props: [{
				name: 'title',
				default: '',
				description: 'Displays a title. Not defining this will show the StreamJar logo.',
				type: 'string',
			}, {
				name: 'tag',
				default: '',
				description: 'Displays an optional tag line below the title or logo.',
				type: 'string',
			}],
		}],
		examples: `
<Popup title="Title!" tag="this is a tagline">
	<p> welcome to my box! It's a nice box. </p>
</Popup>
		`,
	};

	constructor(props: {}) {
		super(props);
	}

	public render() {
		return (
			<Demo config={this.config}>
				<div style={{ overflow: 'scroll', width: '100%', height: '100%'}}>
					<Popup title="Title!" tag="this is a tagline">
							<p> welcome to my box! It's a nice box. </p>
					</Popup>
				</div>
			</Demo>
		);
	}
}
