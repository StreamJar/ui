import * as React from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
	title: 'StreamJar UI|Components/Form/Radio',
	parameters: {
		component: Radio,
	},
};

export const BasicRadio = () => {
	return (
		<>
			<RadioGroup name="one">
				<Radio value="1"> One </Radio>
				<Radio value="2"> Two</Radio>
			</RadioGroup>

			<RadioGroup name="two">
				<Radio value={'1'}> One </Radio>
				<Radio value={'2'}> Two</Radio>
			</RadioGroup>
		</>
	);
};

export const TouchableRadio = () => {
	return (
		<div className="j-touchable">
			<RadioGroup name="three">
				<Radio value={'1'}> One </Radio>
				<Radio value={'2'}> Two</Radio>
			</RadioGroup>
		</div>
	);
};

export const DisabledRadio = () => {
	return (
		<div className="j-touchable">
			<RadioGroup name="three">
				<Radio value={'1'}> One </Radio>
				<Radio value={'3'} disabled={true}> Disabled </Radio>
				<Radio value={'2'}> Two</Radio>
			</RadioGroup>
		</div>
	);
};

