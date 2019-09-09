import * as React from 'react';
import { Select, SelectItem } from './Select';

export default {
	title: 'StreamJar UI|Components/Form/Select',
	parameters: {
		component: Select,
	},
};

export const SimpleMenu = React.createElement(() => {
	return (
		<div className="layout-row">
			<div className="flex-50">
				<Select value="b" onChange={console.log} title="a">
					<SelectItem name="b" value="b"></SelectItem>
					<SelectItem name="c" value="c"></SelectItem>
					<SelectItem name="d" value="d"></SelectItem>
				</Select>
			</div>

			<div className="flex-50">
				<Select multiple={true} onChange={console.log}>
					<SelectItem name="b" value="b"></SelectItem>
					<SelectItem name="c" value="c"></SelectItem>
					<SelectItem name="d" value="d"></SelectItem>
				</Select>
			</div>
		</div>
	);
});
