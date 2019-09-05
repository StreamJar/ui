import * as React from 'react';
import * as classNames from 'classnames';

import { Icon } from '../../icon';
import { IBaseButtonProps } from './types';
import { Ripple } from '../../ripple';

/**
 * Display the base of a button
 */
export const BaseButton: React.FC<IBaseButtonProps> = (props: React.PropsWithChildren<IBaseButtonProps>) => {
	const { colour, children, disabled, iconRight, icon, raised, round } = props;

	// We can only be round if we have an icon too.
	const validRound: boolean = !!icon && round === true;

	const parent: string = classNames({
		'jar-button': true,
		'jar-button-disabled': disabled,
		'jar-button-icon': validRound,
		'jar-button-raised': raised,
		'layout-align-center-center': true,
		'layout-row': true,
	});

	const child: string = classNames({
		'jar-button__content': true,
		'layout-align-center-center': true,
		'layout-row': !iconRight,
		'layout-row-reverse': iconRight,
		right: iconRight,
	});

	const content: string = classNames({ 'jar-button__text': true, 'jar-button__text-hasIcon': !!icon });

	return (
		<div className={parent} data-colour={colour}>
			{!disabled && <Ripple />}

			<div className={child}>
				{icon && (<Icon icon={icon} />)}
				{!validRound && <div className={content} >{children}</div>}
			</div>
		</div>
	);
};

BaseButton.defaultProps = {
	colour: 'primary',
	disabled: false,
	iconRight: false,
	raised: false,
	round: false,
};
