import * as React from 'react';
import * as classNames from 'classnames';
import { Ripple } from '../../ripple';
import { JAR_VALID_THEMES } from '../../../constants';

export type OmittedCheckboxProps =
	'className' | 'name' | 'type' | 'checked' | 'aria-checked' | 'value' | 'onChange';

export interface ICheckboxProps extends
	Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, OmittedCheckboxProps> {

	/** The checkbox colour scheme */
	colour?: JAR_VALID_THEMES;

	/** Disable the ripple animation */
	noRipple?: boolean;

	/** The value of the checkbox */
	value?: boolean;

	/** Handle the value changing */
	onChange?(value: boolean): void;
}

export const Checkbox: React.FC<React.PropsWithChildren<ICheckboxProps>> = (props: React.PropsWithChildren<ICheckboxProps>) => {
	const {
		children,
		colour,
		disabled,
		noRipple,
		value,
		onChange,

		...altProps // tslint:disable-line
	} = props;

	const checkboxContainerRef = React.useRef<HTMLDivElement>(null);
	const checkboxRef = React.useRef<HTMLInputElement>(null);
	const [checkboxValue, setCheckboxValue] = React.useState(value);
	const [checkboxFocus, setCheckboxFocus] = React.useState(false);

	const parent: string = classNames('jar-checkbox layout-row', {
		disabled,
		'jar-checkbox-focused': checkboxFocus,
	});

	const inner: string = classNames({
		'jar-checkbox-inner': true,
		'jar-checkbox-inner-checked': checkboxValue,
	});

	const rippleContainer = <div className="rippleContainer"><Ripple unbounded={true} listenTo={checkboxContainerRef} /></div>;

	// Handle focus event
	const focus = (e: React.FocusEvent<HTMLInputElement>) => {
		setCheckboxFocus(true);

		if (altProps.onFocus) {
			altProps.onFocus(e);
		}
	};

	// Handle focus event
	const blur = (e: React.FocusEvent<HTMLInputElement>) => {
		setCheckboxFocus(false);

		if (altProps.onBlur) {
			altProps.onBlur(e);
		}
	};

	// Handle change event
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCheckboxValue(e.target.checked);

		if (onChange) {
			onChange(e.target.checked);
		}
	};

	// Handle click event
	const click = () => {
		if (checkboxRef.current) {
			checkboxRef.current.click();
		}
	};

	return (
		<div
			ref={checkboxContainerRef}
			className={parent}
			data-colour={colour}
			onClick={click}
			onFocus={focus}
			onBlur={blur}
			tabIndex={0}>

			<div className={inner}>
				{(!noRipple && !disabled) && rippleContainer}

				{/* tslint:disable-next-line */}
				<input
					{...altProps}
					ref={checkboxRef}
					type="checkbox"
					aria-checked={checkboxValue}
					style={{ display: 'none' }}
					checked={checkboxValue}
					tabIndex={-1}
					disabled={disabled}
					onFocus={focus}
					onChange={change} />

				<svg version="1.1" className="jar-checkmark" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve">
					<path className="jar-checkmark-path" fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" />
				</svg>
			</div>

			<label className="jar-checkbox-label">
				{children}
			</label>
		</div>
	);
};

Checkbox.defaultProps = {
	value: false,
	colour: 'primary',
};
