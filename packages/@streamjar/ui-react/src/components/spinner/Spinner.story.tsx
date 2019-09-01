import * as React from 'react';
import { Spinner } from './Spinner';

export default {
	title: 'StreamJar UI|Components/Spinner',
	parameters: {
		component: Spinner,
	},
};

export const SimpleSpinner = () => {
	return <Spinner />;
};

export const CustomSize = () => {
	return (
		<>
			<Spinner size={100} />
			<Spinner size={10} />
		</>
	);
};
