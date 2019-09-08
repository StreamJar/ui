import * as React from 'react';
import { Slider } from './Slider';

export default {
	title: 'StreamJar UI|Components/Form/Slider',
	parameters: {
		component: Slider,
	},
};

export const DefaultSlider = () => {
	return (
		<>
			<Slider onChange={console.log} />
		</>
	);
};

export const CustomisedSlider = () => {
	return (
		<>
			<Slider min={0} max={100} step={10} />
		</>
	);
};
