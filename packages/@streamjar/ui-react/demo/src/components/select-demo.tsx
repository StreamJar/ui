import * as React from 'react';

import { Select, SelectItem } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

const VALUES = [
	'apple',
	'bananna',
	'pineapple',
	'jar',
	'cat',
];

export interface ISelectDemoState {
	searching: boolean;
	values: string[];
}

export class SelectDemo extends React.PureComponent<{}, ISelectDemoState> {
	public to?: number;

	public config: IDemoConfig = {
		name: 'Select',
		components: [{
			name: 'Select',
			props: [{
				name: 'multiple',
				default: 'false',
				description: 'If multiple items should be selectable',
				type: 'boolean',
			}, {
				name: 'title',
				default: '',
				description: 'The title of the select',
				type: 'string',
			}, {
				name: 'search',
				default: 'false',
				description: 'If the select is searchable',
				type: 'boolean',
			}, {
				name: 'searching',
				default: 'false',
				description: 'If the select is searching',
				type: 'boolean',
			}, {
				name: 'value',
				default: '',
				description: 'The current value of the select',
				type: 'string | string[]',
			}, {
				name: 'searchAsOption',
				default: 'false',
				description: 'Allows the search option to be added as an option',
				type: 'boolean',
			}, {
				name: 'onChange',
				default: '() => { /* */ }',
				type: '(value: string | string[]) => void',
				description: 'Callback called when the select is changed',
			}, {
				name: 'onSearch',
				default: '() => { /* */ }',
				type: '(value: string) => void',
				description: 'Called when search changes',
			}, {
				name: 'onAddItem',
				default: '() => { /* */ }',
				type: '(value: string) => void',
				description: 'Called when an item is added.',
			}],
		}, {
			name: 'SelectItem',
			props: [{
				name: 'name',
				default: '',
				description: 'The visual name of the item',
				type: 'string',
			}, {
				name: 'value',
				default: '',
				description: 'The value of the item',
				type: 'string',
			}],
		}],
		examples: `
<Select value="b" onChange={console.log} title="a">
	<SelectItem name="b" value="b"></SelectItem>
	<SelectItem name="c" value="c"></SelectItem>
	<SelectItem name="d" value="d"></SelectItem>
</Select>

<Select multiple={true} onChange={console.log}>
	<SelectItem name="b" value="b"></SelectItem>
	<SelectItem name="c" value="c"></SelectItem>
	<SelectItem name="d" value="d"></SelectItem>
</Select>
<Select
	multiple={true} searching={this.state.searching}
	onAddItem={this.add} onSearch={this.search} search={true} searchAsOption={true} onChange={console.log}>
{this.state.values.map(i => <SelectItem key={i} name={i} value={i}></SelectItem>)}
</Select>
`,
	};

	constructor(props: {}) {
		super(props);

		this.state = {
			values: VALUES,
			searching: false,
		};
	}

	public search = (text: string) => {
		this.setState({
			searching: true,
		});

		clearTimeout(this.to);
		this.to = setTimeout(() => {
			this.setState({
				searching: false,
				values: VALUES.filter(i => i.includes(text)),
			});
		},                   200) as any;
	}

	public add = (value: string): void => {
		VALUES.push(value);

		this.search(value);
	}

	public render() {
		return (
			<Demo config={this.config}>
				<Select value="b" onChange={console.log} title="a">
					<SelectItem name="b" value="b"></SelectItem>
					<SelectItem name="c" value="c"></SelectItem>
					<SelectItem name="d" value="d"></SelectItem>
				</Select>

				<Select multiple={true} onChange={console.log}>
					<SelectItem name="b" value="b"></SelectItem>
					<SelectItem name="c" value="c"></SelectItem>
					<SelectItem name="d" value="d"></SelectItem>
				</Select>

				<Select multiple={true} search={true} searching={this.state.searching} onSearch={this.search} onChange={console.log}>
					{this.state.values.map(i => <SelectItem key={i} name={i} value={i}></SelectItem>)}
				</Select>

				<Select
					multiple={true} searching={this.state.searching}
					onAddItem={this.add} onSearch={this.search} search={true} searchAsOption={true} onChange={console.log}>
					{this.state.values.map(i => <SelectItem key={i} name={i} value={i}></SelectItem>)}
				</Select>
			</Demo>
		);
	}

}
