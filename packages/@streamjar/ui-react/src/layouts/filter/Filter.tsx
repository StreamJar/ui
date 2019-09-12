import * as React from 'react';

import { Button } from '../../components/form/button';
import { useMenu, Menu } from '../../components/menu/Menu';

export const Filter = (props: React.PropsWithChildren<{}>) => {
	const { children } = props;

	const { menuProps, onMenuOpen } = useMenu({
		padding: false,
		width: null!,
		supportContentClick: true,
	});

	return (
		<>
			<Button icon="jar_filter" onClick={onMenuOpen}>Filter </Button>

			<Menu {...menuProps}>
				<div className="jar-filter j-dark">
					<div className="jar-filter__settings layout-row">
						{children}
					</div>
				</div>
			</Menu>
		</>
	);
};
