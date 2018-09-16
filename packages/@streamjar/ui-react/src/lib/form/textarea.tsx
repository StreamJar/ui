import * as React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { FormContext, IFormContext } from './form';
import { InputLabel } from './input-label';

export interface ITextareaProps {
	title?: string;
	name?: string;
	value?: string;

	rows?: number;
	resize?: boolean;
	maxLength?: number;
	readonly?: boolean;
	placeholder?: string;

	onChange(value: string): void;
}

export interface ITextareaState {
	value: string;
}

export class Textarea extends React.PureComponent<ITextareaProps, ITextareaState> {
	public static defaultProps: Partial<ITextareaProps> = {
		onChange: () => { /* */ },
	};

	public ctx?: IFormContext;

	constructor(props: ITextareaProps) {
		super(props);

		this.getTextarea = this.getTextarea.bind(this);

		this.state = { value: this.props.value || '' };
	}

	public componentDidMount(): void {
		if (this.ctx) {
			this.ctx.setValue(this.props.name!, this.props.value!);
		}
	}

	public onChange(ctx: IFormContext, event: React.SyntheticEvent<HTMLTextAreaElement>): void {
		this.setState({
			value: event.currentTarget.value,
		});

		this.props.onChange(event.currentTarget.value);
		ctx.setValue(this.props.name!, event.currentTarget.value);
	}

	public render() {
		const { title, rows, resize, placeholder, maxLength, readonly, name } = this.props;
		const { value } = this.state;

		return <FormContext.Consumer children={this.getTextarea} />;
	}

	public getTextarea(state: IFormContext): JSX.Element {
		const { title, rows, resize, placeholder, maxLength, readonly, name } = this.props;
		const { value } = this.state;

		this.ctx = state;

		const errored = state.hasErrored(name!);

		const teProps = {
			className: `jar-textarea__container`,
			maxLength,
			onChange: this.onChange.bind(this, state),
			placeholder,
			readOnly: readonly,
			rows,
			value,
		};

		const error =  (
			<div className="jar-textarea__error" style={{ paddingTop: 5 }}>
				<Tooltip message={state.getMessage(name!)} position="top"><Icon icon="error_outline"></Icon></Tooltip>
			</div>
		);

		return (
			<React.Fragment>
				{title && <InputLabel>{title}</InputLabel>}

				<div className={`jar-textarea layout-column ${errored ? 'jar-textarea-error' : ''}`}>
					{resize && <TextareaAutosize {...teProps} />}
					{!resize && <textarea {...teProps} />}
					{errored && error}
				</div>
			</React.Fragment>
		);

	}
}
