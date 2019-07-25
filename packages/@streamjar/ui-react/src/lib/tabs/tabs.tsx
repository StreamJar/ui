import * as React from 'react';
import * as classNames from 'classnames';
import {
	DroppableProvided,
	DroppableStateSnapshot,
	DragDropContext,
	Droppable,
	DropResult,
	DraggableProvided,
	DraggableStateSnapshot,
	Draggable,
} from 'react-beautiful-dnd';

import { Ripple } from '../ripple';

export interface IBaseTabProps {
	value: string | boolean | number;
	disabled?: boolean;
	tabRef?: React.Ref<HTMLDivElement>;
	onChange?(): void;
}

export interface INormalTabProps extends IBaseTabProps {
	draggable?: false;
}

export interface IDraggableTabProps extends IBaseTabProps {
	draggable: true;
	index: number;
}

export type TabProps = INormalTabProps | IDraggableTabProps;

export class Tab extends React.PureComponent<TabProps> {
	public static defaultProps: Partial<TabProps> = {
		disabled: false,
		onChange: () => { /* */ },
	};

	public render(): JSX.Element {
		if (this.props.draggable) {
			const { value, index } = this.props;

			return <Draggable draggableId={value.toString()} index={index}>{this.getDraggable}</Draggable>;
		}

		return this.getTab();
	}

	private getTab() {
		const { tabRef, disabled, draggable, children } = this.props;

		const classes: string = classNames('jar-tab', {
			'jar-tab--disabled': disabled,
		});

		return (
			<div
				className={classes}
				ref={tabRef}
				onClick={this.click}
				style={{ display: draggable ? 'block' : undefined }}>
				<Ripple enabled={!disabled} />
				{children}
			</div>
		);
	}

	private readonly click = (): void => {
		if (this.props.disabled) {
			return;
		}

		this.props.onChange!();
	}

	private readonly getDraggable = (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
		return (
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}>
				{this.getTab()}
			</div>
		);
	}
}

export interface IBaseTabsProps {
	value?: string | boolean | number | null;
	draggable?: boolean;
	deselectable?: boolean;
	onChange?(value: string | boolean | number | null): void;
	onMove?(key: string, previousIndex: number, nextIndex: number): void;
}

export interface INormalTabsProps extends IBaseTabsProps {
	value?: string | boolean | number;
	deselectable: false;
	onChange?(value: string | boolean | number): void;
}

export interface ITabsState {
	value?: string | boolean | number | null;
	top?: number;
	left?: number;
	width?: number;
}

export type TabsProps = INormalTabsProps | IBaseTabsProps;

export class Tabs extends React.PureComponent<TabsProps, ITabsState> {
	public static defaultProps: Partial<TabsProps> = {
		onChange: () => { /* */ },
	};

	private valueIndex = new Map<number, string | number | boolean>();
	private readonly references: { [key: string]: React.RefObject<HTMLDivElement> } = {};

	constructor(props: TabsProps) {
		super(props);

		this.state = { value: '' };
	}

	public componentDidMount(): void {
		this.selectTab(this.getCurrentValue(this.props.value));
	}

	public componentDidUpdate(prev: TabsProps): void {
		this.updatePosition(this.getCurrentValue(prev.value === this.props.value ? this.state.value : this.props.value));
	}

	public selectTab(value: string | boolean | number | null): void {
		const { value: previousValue } = this.state;

		let nextValue: string | boolean | number | null = value;
		if (this.props.deselectable && previousValue === value) {
			nextValue = null;
			this.props.onChange!(null);
		} else if (previousValue !== nextValue && nextValue !== null) {
			this.props.onChange!(nextValue);
		}

		this.updatePosition(nextValue);
	}

	public render(): JSX.Element {
		let position: React.CSSProperties | null = null;

		const { left: marginLeft, top, width } = this.state;
		if (marginLeft !== undefined && top !== undefined && width !== undefined) {
			position = { marginLeft, top, width };
		}

		return (
			<div className="jar-tabs">
				{this.getTabs()}

				{position && <div className="jar-tabs__position" style={position}><div /></div>}
			</div>
		);
	}

	private updatePosition(value: string | number | boolean | null): void {
		const { left, width } = this.state;
		if (value === null) {
			if (left !== undefined && width !== undefined) {
				this.setState({
					left: left + (width / 2),
					width: 0,
					value,
				});
			}

			return;
		}

		const target: HTMLDivElement = this.references[value.toString()].current!;

		this.setState({
			left: target.offsetLeft,
			top: target.offsetHeight - 4,
			width: target.clientWidth,
			value,
		});
	}

	private getChildren() {
		const { children } = this.props;

		this.valueIndex = new Map();

		return React.Children.map(children, (child: any, index: number) => {
			const item = child as React.ReactElement<TabProps & { children: string }> | null;

			if (child.type !== Tab || !item) {
				return item;
			}

			this.valueIndex.set(index, item.props.value);

			const refId = item.props.value.toString();
			let ref = this.references[refId];
			if (!ref) {
				ref = React.createRef<HTMLDivElement>();
				this.references[refId] = ref;
			}

			return React.cloneElement(item, {
				...item.props,
				tabRef: ref,
				onChange: () => { this.selectTab(item.props.value); },
			});
		});
	}

	private getTabs() {
		const { draggable } = this.props;
		if (!draggable) {
			return this.getChildren();
		}

		return (
			<DragDropContext onDragEnd={this.handleDragEnd}>
				<Droppable droppableId="tabs" direction="horizontal">
					{(provided, snapshot) => this.getDroppable(provided, snapshot)}
				</Droppable>
			</DragDropContext>
		);
	}

	private getCurrentValue(value: string | number | boolean | null | undefined) {
		if (value === undefined) {
			return this.valueIndex.get(0)!;
		}

		return value;
	}

	private readonly getDroppable = (provided: DroppableProvided, _: DroppableStateSnapshot) => {
		return (
			<div ref={provided.innerRef} {...provided.droppableProps} className="layout-row">
				{this.getChildren()}
				{provided.placeholder}
			</div>
		);
	}

	private readonly handleDragEnd = (drop: DropResult) => {
		const { onMove } = this.props;

		if (drop.destination && onMove) {
			onMove(drop.draggableId, drop.source.index, drop.destination.index);
		}
	}
}
