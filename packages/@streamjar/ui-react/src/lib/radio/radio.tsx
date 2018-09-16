import * as classnames from 'classnames';
import * as React from 'react';

import { Ripple } from '../ripple';
import './radio.scss';

export interface IRadioGroupProps {
	name: string;
	value: string | number;
	onChange(value: string): void;
}

export interface IRadioGroupState {
	value: string | number;
}

export interface IRadioContext {
	name: string;
	value: string | number;
	onChange(value: React.SyntheticEvent<HTMLInputElement>): void;
}

// tslint:disable-next-line
const Context = React.createContext<IRadioContext>({
	name: '',
	onChange: () => { /* */ },
	value: '',
});

export class RadioGroup extends React.PureComponent<IRadioGroupProps, IRadioGroupState> {

	constructor(props: IRadioGroupProps) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = { value: this.props.value };
	}

	public onChange(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({
			value: e.currentTarget.value,
		});

		this.props.onChange(e.currentTarget.value);
	}

	public render(): JSX.Element {
		const { name } = this.props;
		const { value } = this.state;

		const state = { name, value, onChange: this.onChange };

		return (
			<Context.Provider value={state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export interface IRadioProps {
	value: string | number;
}

export class Radio extends React.PureComponent<IRadioProps, { focus: boolean }> {
	public radio: React.RefObject<HTMLInputElement>;
	public el: React.RefObject<HTMLDivElement>;

	constructor(props: IRadioProps) {
		super(props);

		this.radio = React.createRef();
		this.el = React.createRef();

		this.onClick = this.onClick.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.createRadio = this.createRadio.bind(this);
		this.getElement = this.getElement.bind(this);

		this.state = { focus: false };
	}

	public onClick(): void {
		this.radio.current!.click();
	}

	public handleFocus(): void {
		this.setState({
			focus: true,
		});
	}

	public handleBlur(): void {
		this.setState({
			focus: false,
		});
	}

	public getElement(): React.RefObject<HTMLDivElement> {
		return this.el;
	}

	public render(): JSX.Element {
		return <Context.Consumer children={this.createRadio} />;
	}

	private createRadio(state: IRadioContext): JSX.Element {
		const { value } = this.props;
		const { focus } = this.state;

		const isChecked = state.value === value;

		const classes = classnames({
			'jar-radio': true,
			'jar-radio-checked': isChecked,
			'jar-radio-focused': focus,
			'layout-row': true,
		});

		return (
			<div className={classes} tabIndex={0} onClick={this.onClick} ref={this.el} onFocus={this.handleFocus} onBlur={this.handleBlur}>
				<div className="jar-radio__inner">
					<div className="jar-radio__circle"></div>
					<div className="jar-radio__fill"></div>
					<div className="rippleContainer">
						<Ripple unbounded={true} listenTo={this.getElement} />
					</div>
				</div>

				<input
					ref={this.radio}
					type="radio"
					className="jar-radio__input"
					checked={isChecked}
					aria-checked={isChecked}
					name={state.name}
					value={value}
					onChange={state.onChange}
					tabIndex={-1} />

				<div className="jar-radio__label">
					{this.props.children}
				</div>
			</div>
		);
	}
}
