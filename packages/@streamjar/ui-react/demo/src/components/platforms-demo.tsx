import * as React from 'react';

import { Platforms } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class PlatformsDemo extends React.Component<{}, { anchor: HTMLButtonElement | null }> {
	public config: IDemoConfig = {
		name: 'Platforms',
		components: [{
			name: 'Platforms',
			props: [{
				name: 'supported',
				default: `['smashcast', 'twitch', 'mixer', 'picarto', 'dlive']`,
				description: 'Platforms that are supported under this account',
				type: 'string[]',
			}, {
				name: 'value',
				default: `['smashcast', 'twitch', 'mixer', 'picarto', 'dlive']`,
				description: 'Current value',
				type: 'string[]',
			}, {
				name: 'onChange',
				default: '() => {}',
				type: '(platforms: string[]) => void',
				description: 'Callback when platform selection changes',
			}],
		}],
		examples: `
<Platforms></Platforms>
<hr />
<Platforms supported={['mixer', 'twitch']}></Platforms>
		`,
	};

	constructor(props: {}) {
		super(props);
	}

	public render() {
		return (
			<Demo config={this.config}>
				<Platforms></Platforms>
				<hr />
				<Platforms supported={['mixer', 'twitch']}></Platforms>
			</Demo>
		);
	}
}
