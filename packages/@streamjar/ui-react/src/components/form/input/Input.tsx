import * as React from 'react';
import * as classNames from 'classnames';

import { InputLabel } from './InputLabel';

const prefixStyles: React.CSSProperties = {
	fontWeight: 'bold',
	padding: '0px 0px 0px 5px',
};

const suffixStyles: React.CSSProperties = {
	fontWeight: 'bold',
	padding: '0px 5px',
};

export interface IInputProps<T extends string | number | string[] = string> extends
	Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'className'> {

	/** Component to prefix the input with */
	prefixComponent?: JSX.Element;

	/** Component to suffix the input with */
	suffixComponent?: JSX.Element;

	/** Title of the input */
	title?: string;

	/** The input value */
	value?: T;

	/** Input change event */
	onChange?(value: T): void;
}

/** Form input */
export const Input: React.FC<IInputProps> = (props: IInputProps) => {
	const {
		prefixComponent,
		suffixComponent,
		value,
		title,
		onChange,

		...altProps // tslint:disable-line
	} = props;

	const [inputValue, setInputValue] = React.useState(value);
	const [inputFocus, setInputFocus] = React.useState(false);

	// Handle change event
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);

		if (onChange) {
			onChange(e.target.value);
		}
	};

	// Handle focus event
	const focus = (e: React.FocusEvent<HTMLInputElement>) => {
		setInputFocus(true);

		if (altProps.onFocus) {
			altProps.onFocus(e);
		}
	};

	// Handle focus event
	const blur = (e: React.FocusEvent<HTMLInputElement>) => {
		setInputFocus(false);

		if (altProps.onBlur) {
			altProps.onBlur(e);
		}
	};

	const classes = classNames('jar-input layout-row layout-align-center-center', {
		'jar-input-focus': inputFocus,
	});

	return (
		<React.Fragment>
			{title && <InputLabel>{title}</InputLabel>}

			<div className={classes}>
				{prefixComponent && <div style={prefixStyles}> {prefixComponent} </div>}

				<input
					tabIndex={0}
					{...altProps}
					className="jar-input__container"
					style={{ width: '100%' }}
					onBlur={blur}
					onFocus={focus}
					value={inputValue}
					onChange={change} />

				{suffixComponent && <div style={suffixStyles}> {suffixComponent} </div>}
			</div>
		</React.Fragment>
	);
};

Input.defaultProps = {
	value: '',
	onChange: () => { /* */ },
};
