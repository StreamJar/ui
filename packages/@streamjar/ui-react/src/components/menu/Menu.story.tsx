import * as React from 'react';
import { Menu, useMenu } from './Menu';
import { Button } from '../form/button';

export default {
	title: 'StreamJar UI|Components/Menu',
	parameters: {
		component: Menu,
	},
};

export const SimpleMenu = React.createElement(() => {
	const [magic] = React.useState(null);
	const { menuProps, onMenuOpen} = useMenu();

	return (
		<div>
			<Button raised={true} onClick={onMenuOpen}> menu </Button>

			<Menu {...menuProps}>
				<h2> I am menu </h2>
			</Menu>
		</div>
	);
});
