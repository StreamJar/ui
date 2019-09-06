import * as React from 'react'; import { RadioGroupContext } from './RadioGroupContext';
import * as classNames from 'classnames';
import { Ripple } from '../../ripple';
import { JAR_VALID_THEMES } from '../../../constants';

export type OmittedRadioProps =
	'className' | 'name' | 'type' | 'checked' | 'aria-checked';

export interface IRadioProps<T extends string | number = string> extends
	Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, OmittedRadioProps> {

	/** The theme to display */
	colour?: JAR_VALID_THEMES;

	/** Value of the radio button */
	value: T;
}

/** A single radio button */
export const Radio: React.FC<React.PropsWithChildren<IRadioProps>> =
	(props: React.PropsWithChildren<IRadioProps>) => {
		const {
			value,
			children,
			colour,
			...altProps // tslint:disable-line
		} = props;

		const radioCtx = React.useContext(RadioGroupContext);

		const [radioFocus, setRadioFocus] = React.useState(false);
		const isChecked = radioCtx.value === value;
		const rippleRef = React.useRef<HTMLDivElement>(null);
		const radioRef = React.useRef<HTMLInputElement>(null);

		// Handle click event
		const click = () => {
			if (radioRef.current) {
				radioRef.current.click();
			}
		};

		// Handle focus event
		const focus = (e: React.FocusEvent<HTMLInputElement>) => {
			setRadioFocus(true);

			if (altProps.onFocus) {
				altProps.onFocus(e);
			}
		};

		// Handle focus event
		const blur = (e: React.FocusEvent<HTMLInputElement>) => {
			setRadioFocus(false);

			if (altProps.onBlur) {
				altProps.onBlur(e);
			}
		};

		// Handle change event
		const change = (e: React.ChangeEvent<HTMLInputElement>) => {
			radioCtx.onChange(e);

			if (altProps.onChange) {
				altProps.onChange(e);
			}
		};

		const classes = classNames('jar-radio layout-row', {
			'jar-radio-checked': isChecked,
			'jar-radio-focused': radioFocus,
		});

		return (
			<div
				className={classes}
				data-colour={colour}
				tabIndex={0}
				onClick={click}
				ref={rippleRef}
				onFocus={focus}
				onBlur={blur}>

				<div className="jar-radio__inner">
					<div className="jar-radio__circle"></div>
					<div className="jar-radio__fill"></div>
					<div className="rippleContainer">
						<Ripple unbounded={true} listenTo={rippleRef} />
					</div>
				</div>

				<input
					{...altProps}
					ref={radioRef}
					type="radio"
					className="jar-radio__input"
					checked={isChecked}
					aria-checked={isChecked}
					name={radioCtx.name}
					value={value}
					onChange={change}
					tabIndex={-1} />

				<div className="jar-radio__label">
					{children}
				</div>
			</div>
		);
	};

Radio.defaultProps = {
	colour: 'primary',
};
