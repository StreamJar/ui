import * as React from 'react'; import { RadioGroupContext } from './RadioGroupContext';
import * as classNames from 'classnames';
import { Ripple } from '../../ripple';
import { JAR_VALID_THEMES } from '../../../constants';

export type OmittedRadioProps =
	'className' | 'name' | 'type' | 'checked' | 'aria-checked';

export interface IRadioProps<T extends string | number = string> {
	/** The theme to display */
	colour?: JAR_VALID_THEMES;

	/** Value of the radio button */
	value: T;

	/** Whether the radio is disbled */
	disabled?: boolean;

	/** When this radio changes */
	onChange?(value: boolean): void;
}

/** A single radio button */
export const Radio: React.FC<React.PropsWithChildren<IRadioProps>> =
	(props: React.PropsWithChildren<IRadioProps>) => {
		const {
			value,
			children,
			colour,
			disabled,
			onChange,
		} = props;

		const radioCtx = React.useContext(RadioGroupContext);

		const [radioFocus, setRadioFocus] = React.useState(false);
		const isChecked = radioCtx.value === value;
		const rippleRef = React.useRef<HTMLDivElement>(null);
		const radioRef = React.useRef<HTMLInputElement>(null);

		React.useEffect(() => {
			if (onChange) {
				onChange(isChecked);
			}
		}, [isChecked]);

		// Handle click event
		const click = () => {
			if (radioRef.current && !disabled) {
				radioRef.current.click();
			}
		};

		// Handle focus event
		const focus = (e: React.FocusEvent<HTMLInputElement>) => {
			if (!disabled) {
				setRadioFocus(true);
			}
		};

		// Handle focus event
		const blur = (e: React.FocusEvent<HTMLInputElement>) => {
			setRadioFocus(false);
		};

		// Handle change event
		const change = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!disabled) {
				radioCtx.onChange(e);
			}
		};

		const classes = classNames('jar-radio layout-row', {
			'jar-radio-checked': isChecked,
			'jar-radio-focused': radioFocus,
			'jar-radio-disabled': disabled,
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
						<Ripple unbounded={true} listenTo={rippleRef} enabled={!disabled} />
					</div>
				</div>

				<input
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
	disabled: false,
};
