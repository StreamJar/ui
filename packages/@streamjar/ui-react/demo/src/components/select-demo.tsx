import * as React from 'react';

import { Select, SelectItem } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class SelectDemo extends React.PureComponent {
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
				name: 'value',
				default: '',
				description: 'The current value of the select',
				type: 'string | string[]',
			}, {
				name: 'onChange',
				default: '() => { /* */ }',
				type: '(value: string | string[]) => void',
				description: 'Callback called when the select is changed',
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
`,
	};

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
			</Demo>
		);
	}

}
