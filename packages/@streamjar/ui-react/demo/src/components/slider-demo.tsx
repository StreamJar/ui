import * as React from 'react';

import { Slider } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class SliderDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Slider',
		components: [{
			name: 'Slider',
			props: [{
				name: 'min',
				default: 0,
				type: 'number',
				description: 'Minimum value of the slider',
			}, {
				name: 'max',
				default: 0,
				type: 'number',
				description: 'Maximum value of the slider',
			}, {
				name: 'step',
				default: 0,
				type: 'number',
				description: 'How large each step should be',
			}, {
				name: 'diasbled',
				default: 'false',
				type: 'boolean',
				description: 'If the slider is disabled',
			}, {
				name: 'onChange',
				default: '() => { }',
				type: '(value: number) => void',
				description: 'Callback called when the slider moves',
			}, {
				name: 'value',
				default: '0',
				type: 'number',
				description: 'Value of the slider',
			}],
		}],
		examples: `
<Slider min={0} max={50} step={5}></Slider>
<Slider disabled={true} min={0} max={50} step={5}></Slider>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<Slider min={0} max={50} step={5} value={45}></Slider>
				<Slider disabled={true} min={0} max={50} step={5}></Slider>
			</Demo>
		);
	}
}
