import * as React from 'react';
import { Checkbox } from './Checkbox';

export default {
	title: 'StreamJar UI|Components/Form/Checkbox',
	parameters: {
		component: Checkbox,
	},
};

export const BasicCheckbox = () => {
	return (
		<>
			<Checkbox onChange={console.log}> Hi </Checkbox>
			<Checkbox value={true} onChange={console.log}> Hi </Checkbox>
		</>
	);
};

export const TouchableCheckbox = () => {
	return (
		<div className="j-touchable">
			<Checkbox> Hi </Checkbox>
		</div>
	);
};

export const CheckboxVariants = () => {
	return (
		<div>
			<Checkbox colour="success"> success </Checkbox>
			<Checkbox colour="danger"> danger </Checkbox>
			<Checkbox disabled={true}> disabled </Checkbox>
			<Checkbox noRipple={true}> no ripple </Checkbox>
		</div>
	);
};
