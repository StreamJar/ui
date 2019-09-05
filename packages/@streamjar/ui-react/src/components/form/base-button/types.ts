export interface IBaseButtonProps {
	/** Whether the button is raised up visually */
	raised?: boolean;

	/**
	 * Whether the button is disabled
	 */
	disabled?: boolean;

	/**
	 * Whether the button is contrained to be round (text isn't supported). This will be ignored if an
	 * icon is not passed.
	 */
	round?: boolean;

	/**
	 * An icon to display in the button
	 */
	icon?: string;

	/**
	 * The colour theme of the button
	 */
	colour?: 'primary' | 'accent' | 'danger' | 'success';

	/**
	 * Whether to position the given icon on the roght
	 */
	iconRight?: boolean;
}

export interface IButtonProps extends IBaseButtonProps {
	/** Type of button */
	type?: 'submit' | 'reset' | 'button';

	autoFocus?: boolean;
	disabled?: boolean;
	value?: string | string[] | number;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;

}

export interface ILinkProps extends Omit<IBaseButtonProps, 'disabled>'> {
	href?: string;
	rel?: string;
	type?: string;
	target?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
