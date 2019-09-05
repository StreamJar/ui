import * as React from 'react';
import { BaseButton } from '../base-button/BaseButton';
import { IButtonProps } from '../base-button/types';

/**
 * Display a button
 */
export const Button: React.FC<IButtonProps> = (props: React.PropsWithChildren<IButtonProps>) => {
	const {
		raised,
		disabled,
		round,
		icon,
		colour,
		iconRight,
		children,

		...otherProps // tslint:disable-line
	} = props;

	return (
		<button tabIndex={0} className="jarBtn" {...otherProps} disabled={props.disabled}>
			<BaseButton
				raised={raised}
				disabled={disabled}
				round={round}
				icon={icon}
				colour={colour}
				iconRight={iconRight}
				children={children}
				/>
		</button>
	);
};

Button.defaultProps = {
	colour: 'primary',
	disabled: false,
	iconRight: false,
	raised: false,
	round: false,
	type: 'button',
};
