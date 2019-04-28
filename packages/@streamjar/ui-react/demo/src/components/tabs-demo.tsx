import * as React from 'react';

import { Tab, Tabs } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class TabsDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Tabs',
		components: [{
			name: 'Tabs',
			props: [{
				name: 'value',
				default: '',
				description: 'The current tab selection. Defaults to the first tab',
				type: 'string | boolean | number',
			}, {
				name: 'onChange',
				default: '() => { }',
				type: '(value: string | boolean | number) => void',
				description: 'Callback for when the tab is changed',
			}],
		}, {
			name: 'Tab',
			props: [{
				name: 'value',
				default: '',
				description: 'The value of the tab',
				type: 'string | boolean | number',
			}, {
				name: 'disabled',
				default: 'false',
				description: 'Whether the tab is disabled',
				type: 'boolean',
			}],
		}],
		examples: `
<Tabs value={true}>
	<Tab value={true}>yes</Tab>
	<Tab value={false}>no</Tab>
</Tabs>
<Tabs value={true}>
	<Tab value={true}>yes</Tab>
	<Tab disabled={true} value={false}>no</Tab>
</Tabs>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<Tabs value={true}>
					<Tab value={true}>yes</Tab>
					<Tab value={false}>no</Tab>
				</Tabs>
				<Tabs value={true}>
					<Tab value={true}>yes</Tab>
					<Tab disabled={true} value={false}>no</Tab>
				</Tabs>
			</Demo>
		);
	}
}
