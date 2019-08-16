import * as classnames from 'classnames';
import * as React from 'react';

import { Checkbox } from '../checkbox';
import { Icon } from '../icon';
import { Menu } from '../menu';
import { Ripple } from '../ripple';
import { InputLabel } from '../form/input-label';
import { Input } from '../form';
import { Spinner } from '../spinner';
import { Button } from '../button';

export interface ISelectProps {
	title?: string;
	multiple?: boolean;
	search?: boolean;
	searching?: boolean;
	searchAsOption?: boolean;
	value: string | string[];
	onChange(val: string | string[]): void;
	onSearch(val: string): void;
	onAddItem(val: string): void;
}

export interface ISelectState {
	anchor: HTMLDivElement | null;
	value: string[];
	search: string;
}

export class Select extends React.PureComponent<ISelectProps, ISelectState> {
	public static defaultProps: Partial<ISelectProps> = {
		onChange: () => { /* */ },
		onSearch: () => { /* */ },
		onAddItem: () => { /* */ },
	};

	public ref: React.RefObject<HTMLElement> = React.createRef();
	public inputRef: React.RefObject<HTMLDivElement> = React.createRef();
	public values = new Map();
	public to?: number;

	constructor(props: ISelectProps) {
		super(props);

		this.state = { anchor: null, value: this.getValueNormalised(), search: '' };
	}

	public componentDidUpdate(props: ISelectProps): void {
		if (this.props.value !== props.value) {
			this.setState({
				value: this.getValueNormalised(),
			});
		}
	}

	public getValueNormalised(): string[] {
		if (this.props.value === undefined) {
			return [];
		}

		let arr = Array.isArray(this.props.value) ? this.props.value : [this.props.value];

		if (!this.props.multiple && arr[0] !== undefined) {
			arr = [arr[0]];
		}

		return arr;
	}

	public toggleDropdown = (el?: React.MouseEvent | null): void => {
		if (this.state.anchor) {
			this.onClose();
		} else {
			if (el && el.currentTarget) {
				this.setState({
					anchor: el.currentTarget as HTMLDivElement,
				});
			}
		}
	}

	public onClose = () => {
		if (this.state.anchor) {
			this.setState({
				anchor: null,
			});
		}
	}

	public onClick = (value: string): void => {
		this.setState(state => {
			let newState = [value];

			if (this.props.multiple) {
				if (this.state.value.includes(value) && this.props.multiple) {
					newState = state.value.filter(i => i !== value);
				} else {
					newState = [...state.value, value];
				}
			}

			this.valueChanged(newState);

			return { value: newState, anchor: null };
		});
	}

	public search = (text: string) => {
		this.setState({ search: text });
		clearTimeout(this.to!);

		this.to = setTimeout(() => {
			this.props.onSearch(text);
		}, 200) as any;
	}

	public render(): JSX.Element {
		const { children, multiple, title, search, searching, searchAsOption } = this.props;
		const { anchor, value } = this.state;

		const classes = classnames({
			'jar-select': true,
			'jar-select-multiple': multiple,
			'layout-row': true,
		});

		const childs = React.Children.map(children, child => {
			const item = child as React.ReactElement<ISelectItemProps & { children: string }> | null;

			if (!item) {
				return item;
			}

			this.values.set(item.props.value, item.props.name);

			return React.cloneElement(item, {
				...item.props,
				multiple,
				onClick: () => { this.onClick(item.props.value as any); },
				values: value,
			});
		});

		const wrapper = classnames({
			'layout-row': true,
			'layout-row-wrap': true,
			'layout-align-start-center': true,
			flex: true,
			'jar-select__items': multiple,
			'jar-select__option': !multiple,
		});

		return (
			<React.Fragment>
				{title && <InputLabel>{title}</InputLabel>}

				<div className={classes} onClick={this.toggleDropdown} tabIndex={0}>
					<div className={wrapper}>
						{this.getValidItems()}
					</div>

					<div className="jar-select__ui layout-column layout-align-center-center">
						<Icon icon="arrow_drop_down"></Icon>
					</div>
				</div>

				<Menu anchor={anchor} anchorWidth={true} supportContentClick={true} onClose={this.onClose}>
					<div ref={this.inputRef}>
						<div className="layout-row">
							{search && <div className="flex"><Input name="search" placeholder="Search" onChange={this.search} /></div>}
							{search && searchAsOption && <Button icon="add" round={true} onClick={this.addItem} />}
						</div>
						{search && searching && <Spinner size={25} />}
						{search && !searching && !childs.length && <p style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: 5 }}> No results </p>}
					</div>

					{!searching && childs}
				</Menu>
			</React.Fragment>
		);
	}

	private getValidItems(): JSX.Element[] {
		return this.state.value.map(i => this.values.get(i)).filter(a => !!a)
			.map(i => {
				if (this.props.multiple) {
					return <div key={i} className="jar-select__item">{i}</div>;
				}

				return i;
			});
	}

	private valueChanged(val: string[]): void {
		const validVal = val.filter(i => this.values.has(i));

		this.props.onChange(this.props.multiple ? validVal : validVal[0]);
	}

	private addItem = (): void => {
		if (this.state.search.trim() === '') {
			return;
		}

		this.props.onAddItem(this.state.search);
	}
}

export interface ISelectItemProps {
	name: string;
	value: string | number | boolean;
	values?: any[];
	multiple?: boolean;
	onClick?(): void;
}

export class SelectItem extends React.PureComponent<ISelectItemProps> {
	public render(): JSX.Element {
		const { name, multiple, value, values } = this.props;

		const active = (values || []).includes(value);

		return (
			<div className="jar-select-item" onClick={this.props.onClick} tabIndex={0}>
				<Ripple />

				<div className="jar-select-item__container layout-row">
					{multiple && <div className="jar-select-item__check"><Checkbox value={active} noRipple={true}></Checkbox></div>}

					<span className="jar-select-item__value"> {name} </span>
				</div>
			</div>
		);
	}
}
