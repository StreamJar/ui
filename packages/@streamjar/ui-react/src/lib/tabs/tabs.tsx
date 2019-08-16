import * as React from 'react';
import * as classNames from 'classnames';

import { Ripple } from '../ripple';

export interface ITabProps {
	value: string | boolean | number;
	disabled?: boolean;
	active?: boolean;
	onClick?(name: string | boolean | number): void;
	onChange?(): void;
}

export class Tab extends React.PureComponent<ITabProps> {
	public static defaultProps: Partial<ITabProps> = {
		disabled: false,
		active: false,
		onChange: () => { /* */ },
	};

	public render(): JSX.Element {
		const { children, disabled, active } = this.props;

		const classes: string = classNames('jar-tab', {
			'jar-tab--disabled': disabled,
			'jar-tab--active': active,
		});

		return <div tabIndex={0} className={classes} onClick={this.click}> <Ripple enabled={!disabled} /> {children} </div>;
	}

	private click = (): void => {
		if (this.props.disabled) {
			return;
		}

		this.props.onChange!();

		if (this.props.onClick) {
			this.props.onClick(this.props.value);
		}
	}
}

export interface ITabsProps {
	value?: string | boolean | number;
	onChange?(value: string | boolean | number): void;
}

export interface ITabsState {
	value?: string | boolean | number;
	position?: {
		top: number;
		left: number;
		width: number;
	};
}

export class Tabs extends React.PureComponent<ITabsProps, ITabsState> {
	public static defaultProps: Partial<ITabsProps> = {
		onChange: () => { /* */ },
	};

	public ref?: React.RefObject<HTMLDivElement>;
	public valueIndex = new Map();

	constructor(props: ITabsProps) {
		super(props);

		this.ref = React.createRef();
		this.state = { value: '' };
	}

	public componentDidMount(): void {
		this.selectTab(this.props.value);
	}

	public componentDidUpdate(prev: ITabsProps): void {
		if (prev.value !== this.props.value) {
			this.setState({
				value: this.props.value,
			});
		}
	}

	public selectTab(val: any): void {
		const target: HTMLDivElement = this.ref!.current!.children[this.valueIndex.get(val) || 0] as any;

		if (this.state.value !== val) {
			(this.props.onChange!)(val);
		}

		this.setState({
			position: {
				left: target.offsetLeft,
				top: target.offsetHeight - 4,
				width: target.clientWidth,
			},
			value: val,
		});
	}

	public render(): JSX.Element {
		let position: React.CSSProperties | null = null;

		if (this.state.position) {
			position = {
				marginLeft: this.state.position.left,
				top: this.state.position.top,
				width: this.state.position.width,
			};
		}

		this.valueIndex = new Map();

		const children = React.Children.map(this.props.children, (child: any, index: number) => {
			const item = child as React.ReactElement<ITabProps & { children: string }> | null;

			if (child.type !== Tab || !item) {
				return item;
			}

			this.valueIndex.set(item.props.value, index);

			return React.cloneElement(item, {
				...item.props,
				active: item.props.value === this.state.value,
				onChange: () => { this.selectTab(item.props.value); },
			});
		});

		return (
			<div className="jar-tabs">
				<div ref={this.ref}>
					{children}
				</div>

				{position && <div className="jar-tabs__position" style={position} />}
			</div>
		);
	}
}
