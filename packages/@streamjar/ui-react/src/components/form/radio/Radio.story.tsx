import * as React from 'react';
import { RadioGroup } from './RadioGroup';
import { Radio } from './Radio';

export default {
	title: 'StreamJar UI|Components/Form/Radio Group',
	parameters: {
		component: RadioGroup,
	},
};

export const BasicRadioGroup = () => {
	return (
		<>
			<RadioGroup name="test" onChange={console.log} value={'onetwo'}>
				<Radio value={'testing'}> Testing </Radio>
				<Radio value={'onetwo'}> OneTwo </Radio>
			</RadioGroup>
		</>
	);
};

export const TouchableRadioGroup = () => {
	return (
		<div className="j-touchable">
			<RadioGroup name="test" onChange={console.log} value={'onetwo'}>
				<Radio value={'testing'}> Testing </Radio>
				<Radio value={'onetwo'}> OneTwo </Radio>
			</RadioGroup>
		</div>
	);
};
