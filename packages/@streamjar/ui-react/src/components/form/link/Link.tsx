import * as React from 'react';
import { BaseButton } from '../base-button/BaseButton';
import { ILinkProps } from '../base-button/types';

/**
 * Display a link
 */
export const Link: React.FC<ILinkProps> = (props: React.PropsWithChildren<ILinkProps>) => {
	const {
		raised,
		round,
		icon,
		colour,
		iconRight,
		children,

		...otherProps // tslint:disable-line
	} = props;

	return (
		<a tabIndex={0} className="jarBtn" {...otherProps} href={otherProps.href}>
			<BaseButton
				raised={raised}
				disabled={false}
				round={round}
				icon={icon}
				colour={colour}
				iconRight={iconRight}
				children={children}
				/>
		</a>
	);
};

Link.defaultProps = {
	colour: 'primary',
	iconRight: false,
	raised: false,
	round: false,
};
