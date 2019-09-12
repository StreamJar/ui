import * as React from 'react';
import { Filter, FilterSection } from './';
import { RadioGroup, Radio } from '../../components/form/radio';
import { Platforms } from '../platforms';
import { PlatformBrands } from '../../constants';

export default {
	title: 'StreamJar UI|Layouts/Filter',
	parameters: {
		component: Filter,
	},
};

export const BasicFilter = () => {
	return (
		<Filter>
			<FilterSection name="Platform">
				<Platforms platforms={Array.from(PlatformBrands.keys())} />
			</FilterSection>

			<FilterSection name="Sort">
				<RadioGroup value="true" name="sort">
					<Radio value="true"> Ascending </Radio>
					<Radio value="false"> Descending </Radio>
				</RadioGroup>
			</FilterSection>
		</Filter>
	);
};
