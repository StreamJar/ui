import * as React from 'react';

import { Filter, FilterSection, Platforms, Radio, RadioGroup } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class FilterDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Filter',
		components: [{
			name: 'Filter',
			props: [],
		}, {
			name: 'FilterSection',
			props: [{
				name: 'name',
				default: '',
				description: 'Name of the section',
				type: 'string',
			}],
		}],
		examples: `
<Filter>
	<FilterSection name="Platform">
		<Platforms />
	</FilterSection>

	<FilterSection name="Sort">
		<RadioGroup value="true" name="sort" onChange={() => {/**/ }}>
			<Radio value="true"> Ascending </Radio>
			<Radio value="false"> Descending </Radio>
		</RadioGroup>
	</FilterSection>
</Filter>
		`,
	};

	public change = () => { /* */ };

	public render() {
		return (
			<Demo config={this.config}>
				<div style={{ textAlign: 'right' }}>
					<Filter>
						<FilterSection name="Platform">
							<Platforms />
						</FilterSection>

						<FilterSection name="Sort">
							<RadioGroup value="true" name="sort" onChange={this.change}>
								<Radio value="true"> Ascending </Radio>
								<Radio value="false"> Descending </Radio>
							</RadioGroup>
						</FilterSection>
					</Filter>
				</div>
			</Demo>
		);
	}
}
