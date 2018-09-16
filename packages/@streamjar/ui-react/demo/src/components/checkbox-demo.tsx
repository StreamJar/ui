import * as React from 'react';

import { Checkbox } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class CheckboxDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Checkbox',
		components: [{
			name: 'Checkbox',
			props: [
				{
					name: 'colour',
					default: 'primary',
					type: 'string',
					description: 'Colour class for a checkbox',
				},
				{
					name: 'label',
					default: '',
					type: 'string',
					description: 'If the element should display a label',
				},
				{
					name: 'noRipple',
					default: 'false',
					type: 'boolean',
					description: 'If we should hide the ripple on interaction',
				},
				{
					name: 'disabled',
					default: 'false',
					type: 'boolean',
					description: 'If the checkbox is disabled',
				},
				{
					name: 'value',
					default: '',
					type: 'boolean',
					description: 'Value to select',
				}, {
					name: 'onChange',
					default: '() => { /* */ }',
					type: '(value: boolean) => void',
					description: 'Callback function when value has changed',
				},
			],
		}],
		examples: `
<Checkbox> Checkbox </Checkbox>
<Checkbox colour="success"> Success </Checkbox>
<Checkbox colour="danger"> Dangerous </Checkbox>
<Checkbox noRipple={true} label="a"> No Ripple </Checkbox>
<Checkbox disabled={true} value={true} label="a"> Disabled </Checkbox>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<Checkbox> Checkbox </Checkbox>
				<Checkbox colour="success"> Success </Checkbox>
				<Checkbox colour="danger"> Dangerous </Checkbox>
				<Checkbox noRipple={true} label="a"> No Ripple </Checkbox>
				<Checkbox disabled={true} value={true} label="a"> Disabled </Checkbox>
			</Demo>
		);
	}
}
