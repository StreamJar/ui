import * as classnames from 'classnames';
import * as React from 'react';

import { Icon } from '../icon';
import { Tooltip } from '../tooltip';
import { FormContext, IFormContext } from './form';
import { InputLabel } from './input-label';

export interface IInputProps {
	type: string;
	title: string;
	name: string;
	value?: string;

	prefix?: JSX.Element;
	suffix?: JSX.Element;

	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	step?: number;
	pattern?: string;
	readonly?: boolean;
	placeholder?: string;

	onChange(value: string): void;
}

export interface IInputState {
	value: string;
	focus: boolean;
}

export class Input extends React.PureComponent<IInputProps, IInputState> {
	public static defaultProps: Partial<IInputProps> = {
		onChange: () => { /* */ },
	};

	public ctx?: IFormContext;

	constructor(props: IInputProps) {
		super(props);

		this.blur = this.blur.bind(this);
		this.focus = this.focus.bind(this);
		this.getInput = this.getInput.bind(this);

		this.state = { value: this.props.value || '', focus: false };
	}

	public componentDidMount(): void {
		if (this.ctx) {
			this.ctx.setValue(this.props.name, this.props.value!);
		}
	}

	public focus(): void {
		this.setState({
			focus: true,
		});
	}

	public blur(): void {
		this.setState({
			focus: false,
		});
	}

	public change(form: IFormContext, event: React.SyntheticEvent<HTMLInputElement>): void {
		this.setState({
			value: event.currentTarget.value,
		});

		form.setValue(this.props.name, event.currentTarget.value);
		this.props.onChange(event.currentTarget.value);
	}

	public render(): JSX.Element {
		return <FormContext.Consumer children={this.getInput} />;
	}

	private getInput(state: IFormContext) {
		const {
			title,
			name,
			prefix,
			suffix,
			type,

			minLength,
			maxLength,
			min,
			max,
			step,
			pattern,
			readonly,
			placeholder,
		} = this.props;

		const { focus, value } = this.state;

		const prefixStyles: React.CSSProperties = {
			fontWeight: 'bold',
			padding: '0px 0px 0px 5px',
		};

		const suffixStyles: React.CSSProperties = {
			fontWeight: 'bold',
			padding: '0px 5px',
		};

		this.ctx = state;

		const errored = state.hasErrored(name);

		const classes = classnames({
			'jar-input': true,
			'jar-input-error': errored,
			'jar-input-focus': focus,
			'layout-align-center-center': true,
			'layout-row': true,
		});

		const error =  (
			<div className="jar-input__error" style={{ paddingTop: 5 }}>
				<Tooltip message={state.getMessage(name)} position="top"><Icon icon="error_outline"></Icon></Tooltip>
			</div>
		);

		return (
			<React.Fragment>
				{title && <InputLabel>{title}</InputLabel>}

				<div className={classes}>
					{prefix && <div style={prefixStyles}> {prefix} </div>}

					<input
						className="jar-input__container"
						style={{ width: '100%' }}
						type={type}
						value={value}
						readOnly={readonly}
						minLength={minLength}
						maxLength={maxLength}
						min={min}
						max={max}
						step={step}
						pattern={pattern}
						onChange={this.change.bind(this, state)} // tslint:disable-line
						placeholder={placeholder}
						onFocus={this.focus}
						onBlur={this.blur}
						tabIndex={0}
						/>

					{errored && error}
					{suffix && <div style={suffixStyles}> {suffix} </div>}
				</div>
			</React.Fragment>
		);
	}
}
