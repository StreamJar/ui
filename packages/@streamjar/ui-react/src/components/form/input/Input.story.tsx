import * as React from 'react';
import { Input } from './Input';

export default {
	title: 'StreamJar UI|Components/Form/Input',
	parameters: {
		component: Input,
	},
};

export const NormalInput = () => {
	return (
		<>
			<Input type="text" title="Test input" />
			<Input type="number" title="Test input" />
		</>
	);
};

export const TouchableInput = () => {
	return (
		<div className="j-touchable">
			<Input type="text" title="Test input" />
			<Input type="number" title="Test input" />
		</div>
	);
};

export const PrefixAndSuffix = () => {
	return (
		<div>
			<Input type="number" title="Test input" prefixComponent={<p> $ </p>} />
			<Input type="number" title="Test input" suffixComponent={<p> USD </p>} />
			<Input type="number" title="Test input" prefixComponent={<p> $ </p>} suffixComponent={<p> USD </p>} />
		</div>
	);
};
