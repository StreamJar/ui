import * as React from 'react';
import { Textarea } from './Textarea';

export default {
	title: 'StreamJar UI|Components/Form/Textarea',
	parameters: {
		component: Textarea,
	},
};

export const NormalTextarea = () => {
	return (
		<>
			<Textarea name="meaning" title="description" />
		</>
	);
};

export const ResizingTextarea = () => {
	return (
		<div>
			<Textarea name="meaning" title="description" rows={5} resize={true} />
		</div>
	);
};

export const TouchableTextarea = () => {
	return (
		<div className="j-touchable">
			<Textarea name="meaning" title="description" rows={5} />
		</div>
	);
};
