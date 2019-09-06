import * as React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { InputLabel } from '../input/InputLabel';

export interface ITextareaProps<T extends string | number | string[] = string> extends
	Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onChange' | 'className'> {

	/** If the textarea should automagically resize */
	resize?: boolean;

	/** The initial value of the textarea */
	value?: T;

	/** The number of rows to display */
	rows?: number;

	/** Value change handler */
	onChange?(value: T): void;
}

export const Textarea: React.FC<ITextareaProps> = (props: ITextareaProps) => {
	const {
		resize,
		onChange,
		value,
		ref, // apparently this makes textarea sad.

		...otherProps // tslint:disable-line
	} = props;

	const TextareaComponent = resize ? TextareaAutosize : 'textarea';
	const [textareaValue, setTextareaValue] = React.useState(value);

	// Handle change event
	const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextareaValue(e.currentTarget.value);

		if (onChange) {
			onChange(e.currentTarget.value);
		}
	};

	return (
		<>
			{otherProps.title && <InputLabel>{otherProps.title}</InputLabel>}

			<div className="jar-textarea layout-column">
				<TextareaComponent
					{...otherProps}
					className="jar-textarea__container"
					value={textareaValue}
					onChange={change} />
			</div>
		</>
	);
};

Textarea.defaultProps = {
	onChange: () => { /* */ },
	resize: false,
};
