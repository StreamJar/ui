import * as React from 'react';

import { Ripple } from '../ripple';

export interface ITabProps {
	value: string | boolean | number;
	onChange?(): void;
}

export class Tab extends React.PureComponent<ITabProps> {
	public render() {
		const { children } = this.props;

		return <div className="jar-tab" onClick={this.props.onChange}> <Ripple /> {children} </div>;
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
		if (this.props.value) {
			this.setState({
				value: this.props.value,
			});

		}

		setTimeout(() => {
			this.selectTab(this.props.value);
		});
	}

	public componentWillReceiveProps(prev: ITabsProps, next: ITabsProps): void {
		if (prev.value !== next.value) {
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
			value: this.props.value,
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
			if (child.type !== Tab) {
				return child;
			}

			this.valueIndex.set(child.props.value, index);

			return React.cloneElement(child, {
				...child.props,
				onChange: () => { this.selectTab(child.props.value); },
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
