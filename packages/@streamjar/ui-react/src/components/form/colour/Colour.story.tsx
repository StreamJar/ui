import * as React from 'react';
import { Colour } from './Colour';

export default {
	title: 'StreamJar UI|Components/Form/Colour',
	parameters: {
		component: Colour,
	},
};

export const NormalColour = () => {
	return (
		<>
			<Colour value="red" />
		</>
	);
};
