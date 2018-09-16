import * as classNames from 'classnames';
import * as React from 'react';

import { Ripple } from '../ripple';

export interface ICheckboxProps {
	colour?: string;
	label?: string;
	noRipple?: boolean;
	disabled?: boolean;
	value?: boolean;
	onChange?(value: boolean): void;
}

export interface ICheckboxState {
	value: boolean;
	focus: boolean;
}

import './checkbox.scss';

export class Checkbox extends React.PureComponent<ICheckboxProps, ICheckboxState> {
	public static defaultProps: Partial<ICheckboxProps> = {
		colour: 'primary',
		disabled: false,
		noRipple: false,
		onChange: () => { /* */ },
	};

	public el: React.RefObject<HTMLDivElement>;
	public input: React.RefObject<HTMLInputElement>;

	constructor(props: ICheckboxProps) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.getElement = this.getElement.bind(this);

		this.input = React.createRef();
		this.el = React.createRef();

		this.state = {
			focus: false,
			value: !!this.props.value,
		};
	}

	public handleChange(): void  {
		(this.props.onChange!)(!this.state.value);

		this.setState((state) => ({
			value: !state.value,
		}));
	}

	public componentDidUpdate(prev: ICheckboxProps) {
		if (this.props.value !== prev.value) {
			this.setState({ value: !!this.props.value });
		}
	}

	public handleClick(): void {
		if (!this.props.disabled) {
			this.input.current!.click();
		}
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
		const { children, colour, disabled, label, noRipple } = this.props;

		const parent: string = classNames({
			disabled: this.props.disabled,
			'jar-checkbox': true,
			'jar-checkbox-focused': this.state.focus,
			'jar-checkbox-labeled': !!label,
			'layout-row': true,
		});

		const inner: string = classNames({
			'jar-checkbox-inner': true,
			'jar-checkbox-inner-checked': this.state.value,
		});

		const rippleContainer = <div className="rippleContainer"><Ripple unbounded={true} listenTo={this.getElement} /></div>;

		return (
			<div
				ref={this.el}
				className={parent}
				data-colour={colour}
				onClick={this.handleClick}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				tabIndex={0}>

				<div className={inner}>
					{(!noRipple && !disabled) && rippleContainer}

					<input
						ref={this.input}
						type="checkbox"
						aria-checked={this.state.value}
						style={{ display: 'none' }}
						checked={this.state.value}
						tabIndex={-1}
						onFocus={this.handleFocus}
						onChange={this.handleChange} />

					<svg version="1.1" className="jar-checkmark" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve">
						<path className="jar-checkmark-path" fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" />
					</svg>

				</div>

				<label className="jar-checkbox-label">
					{children}
				</label>
			</div>
			);
		}
	}
