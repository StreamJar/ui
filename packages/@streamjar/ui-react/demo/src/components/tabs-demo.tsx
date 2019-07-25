import * as React from 'react';

import { Tab, Tabs } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class TabsDemo extends React.Component<{}, { value: string; tabs: string[] }> {
	public config: IDemoConfig = {
		name: 'Tabs',
		components: [{
			name: 'Tabs',
			props: [{
				name: 'value',
				default: '',
				description: 'The current tab selection. Defaults to the first tab, and may be null if tabs are deselectable',
				type: 'string | boolean | number | null',
			}, {
				name: 'draggable',
				default: 'false',
				description: 'Whether tabs within the element can be repositioned by the user by dragging each one',
				type: 'boolean',
			}, {
				name: 'deselectable',
				default: 'false',
				description: 'Whether an active tab may be clicked again to set the value to null',
				type: 'boolean',
			}, {
				name: 'onChange',
				default: '() => { }',
				type: '(value: string | boolean | number | null) => void',
				description: 'Callback for when the tab is changed',
			},
			{
				name: 'onMove',
				default: '() => { }',
				type: '(key: string, previousIndex: number, nextIndex: number) => void',
				description: 'Callback for when a tab has been moved to a new position',
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
			}, {
				name: 'draggable',
				default: 'false',
				description: 'Whether the tab can be dragged by the user',
				type: 'boolean',
			}, {
				name: 'index',
				default: '',
				description: 'If this tab is draggable, this index indicates the current placement of the tab',
				type: 'number',
			}],
		}],
		examples: `
constructor(props) {
	super(props);

	this.state = { value: 'Tips', tabs: ['Tips', 'Followers', 'Subscribers', 'Hosts'] };
}

public render() {
	return (
		<Demo config={this.config}>
			<Tabs>
				<Tab value={true}>yes</Tab>
				<Tab value={false}>no</Tab>
			</Tabs>
			<Tabs value={true}>
				<Tab value={true}>yes</Tab>
				<Tab disabled={true} value={false}>no</Tab>
			</Tabs>
			<Tabs value={this.state.value} draggable={true} deselectable={true} onChange={this.handleChange} onMove={this.handleMove}>
				{this.state.tabs.map((value, index) => <Tab key={value} value={value} draggable={true} index={index}>{value}</Tab>)}
			</Tabs>
		</Demo>
	);
}

private readonly handleChange = (value: string) => {
	this.setState({ value });
}

private readonly handleMove = (_: string, previousIndex: number, nextIndex: number) => {
	const tabs = [...this.state.tabs];
	tabs.splice(nextIndex, 0, tabs.splice(previousIndex, 1)[0]);
	this.setState({ tabs });
}
		`,
	};

	constructor(props) {
		super(props);

		this.state = { value: 'Tips', tabs: ['Tips', 'Followers', 'Subscribers', 'Hosts'] };
	}

	public render() {
		return (
			<Demo config={this.config}>
				<Tabs>
					<Tab value={true}>yes</Tab>
					<Tab value={false}>no</Tab>
				</Tabs>
				<Tabs value={true}>
					<Tab value={true}>yes</Tab>
					<Tab disabled={true} value={false}>no</Tab>
				</Tabs>
				<Tabs value={this.state.value} draggable={true} deselectable={true} onChange={this.handleChange} onMove={this.handleMove}>
					{this.state.tabs.map((value, index) => <Tab key={value} value={value} draggable={true} index={index}>{value}</Tab>)}
				</Tabs>
			</Demo>
		);
	}

	private readonly handleChange = (value: string) => {
		this.setState({ value });
	}

	private readonly handleMove = (_: string, previousIndex: number, nextIndex: number) => {
		const tabs = [...this.state.tabs];
		tabs.splice(nextIndex, 0, tabs.splice(previousIndex, 1)[0]);
		this.setState({ tabs });
	}
}
