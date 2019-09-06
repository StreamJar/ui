import * as React from 'react';

export interface IRadioGroupContext {
	name: string;
	value: string | number;
	onChange(value: React.ChangeEvent<HTMLInputElement>): void;
}

export const RadioGroupContext = React.createContext<IRadioGroupContext>({
	name: '',
	onChange: () => { /* */ },
	value: '',
});
