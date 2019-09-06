import * as React from 'react';
import { RadioGroupContext } from './RadioGroupContext';

export interface IRadioGroupProps<T extends string | number = string> {
	/** The name of the radio group */
	name: string;

	/** The updated value of the radio button */
	value?: T | null;

	/** When the radio button's value is changed. */
	onChange?(value: T): void;
}

/** The radio group to wrap multiple radio buttons */
export const RadioGroup: React.FC<React.PropsWithChildren<IRadioGroupProps>> =
	<T extends string | number = string>(props: React.PropsWithChildren<IRadioGroupProps<T>>) => {
		const {
			name,
			value,
			onChange,
			children,
		} = props;

		const [groupValue, setGroupValue] = React.useState<T>(value!);

		// Handle change event
		const change = (e: React.ChangeEvent<HTMLInputElement>) => {
			setGroupValue(e.currentTarget.value as T);

			if (onChange) {
				onChange(e.currentTarget.value as T);
			}
		};

		return (
			<RadioGroupContext.Provider value={{ name, onChange: change, value: groupValue }}>
				{children}
			</RadioGroupContext.Provider>
		);
	};

RadioGroup.defaultProps = {
	value: null,
	onChange() { /* */ },
};
