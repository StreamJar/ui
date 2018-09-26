import * as classnames from 'classnames';
import * as React from 'react';

import { Icon } from '../icon';
import { Ripple } from '../ripple';

export interface IButtonProps {
	raised?: boolean;
	disabled?: boolean;
	round?: boolean;
	icon?: string;
	colour?: string;
	iconRight?: boolean;
	type: string;
	onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

export class Button extends React.PureComponent<IButtonProps> {
	public static defaultProps: Partial<IButtonProps> = {
		colour: 'primary',
		disabled: false,
		iconRight: false,
		onClick: () => { /* */ },
		raised: false,
		round: false,
		type: 'submit',
	};

	constructor(props: IButtonProps) {
		super(props);
	}

	public render(): JSX.Element {
		const { colour, children, disabled, iconRight, icon, onClick, raised, round, type } = this.props;

		const isDisabled = disabled;

		const parent: string = classnames({
			'jar-button': true,
			'jar-button-disabled': isDisabled,
			'jar-button-icon': !!icon && round,
			'jar-button-raised': raised,
			'layout-align-center-center': true,
			'layout-row': true,
		});

		const child: string = classnames({
			'jar-button__content': true,
			'layout-align-center-center': true,
			'layout-row': !iconRight,
			'layout-row-reverse': iconRight,
			right: iconRight,
		});

		const content: string = classnames({ 'jar-button__text': true, 'jar-button__text-hasIcon': !!icon });

		return (
			<button type={type} className="jarBtn" onClick={onClick} disabled={isDisabled}>
				<div className={parent} data-colour={colour}>
					{!isDisabled && <Ripple />}

					<div className={child}>
						{icon && (<Icon icon={icon}></Icon>)}
						<div className={content} >{children}</div>
					</div>
				</div>
			</button>
		);
	}
}
