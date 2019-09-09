import * as React from 'react';
import { default as EventListener } from 'react-event-listener';

import { Portal } from '../portal/portal';
import { position, pickBestPosition, IAnchorSide, IAnchorType } from '../../common/positioner';

export interface IAnchorProps {
	/**
	 * Predefine the item size
	 */
	width?: number;

	/**
	 * Predefine the item size
	 */
	height?: number;

	/** What axis we're on  */
	axis?: 'vertical' | 'horizontal';

	/** Where to pull on alternate axis */
	pull?: IAnchorSide; // start | center | end of item

	/** What we're anchoring to */
	anchorTo: HTMLElement;

	/** Set the anchor offset around the target */
	offset?: number;

	/** Set the anchor bounds around the page. */
	pageOffset?: number;

	/** Force anchor to be same size as anchor */
	matchAnchorWidth?: boolean;

	/** Force anchor to be same size as anchor */
	matchAnchorHeight?: boolean;
}

export interface IAnchorState {
	location: {
		width?: number;
		height?: number;
		top?: number;
		left?: number;
		maxHeight?: number;
		maxWidth?: number;
	};
}

export class Anchor extends React.PureComponent<IAnchorProps, IAnchorState> {
	public static defaultProps: Partial<IAnchorProps> = {
		offset: 5,
		pageOffset: 5,
		pull: 'center',
		axis: 'vertical',
	};

	public anchorRef: React.RefObject<HTMLDivElement>;

	constructor(props: IAnchorProps) {
		super(props);

		this.anchorRef = React.createRef();

		this.state = {
			location: {
			},
		};
	}

	public componentDidMount(): void {
		this.setPosition();
	}

	public calculateWidth(): {
		left: number;
		top: number;
		width: number | undefined;
		height: number | undefined;
		maxWidth: number | undefined;
		maxHeight: number | undefined;
	} {
		let modifiedWidth: number | undefined;
		let modifiedHeight: number | undefined;
		let itemWidth = this.props.width ? this.props.width : this.anchorRef.current!.getBoundingClientRect().width;
		let itemHeight = this.props.height ? this.props.height : this.anchorRef.current!.getBoundingClientRect().height;

		if (this.props.matchAnchorWidth) {
			itemWidth = this.props.anchorTo.getBoundingClientRect().width;
			modifiedWidth = this.props.anchorTo.getBoundingClientRect().width;
		}

		if (this.props.matchAnchorHeight) {
			itemHeight = this.props.anchorTo.getBoundingClientRect().height;
			modifiedHeight = this.props.anchorTo.getBoundingClientRect().height;
		}

		const anchorBounds = this.props.anchorTo.getBoundingClientRect();
		let { left, top, maxWidth, maxHeight } = position( // tslint:disable-line
			this.props.axis!,
			this.props.pull!,
			anchorBounds, {
				height: itemHeight,
				width: itemWidth,
			},
			this.props.offset!,
			this.props.pageOffset!,
			{
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			},
		);

		return { width: modifiedWidth, height: modifiedHeight, left, top, maxWidth, maxHeight };
	}

	public setPosition = (): void => {
		const { width, left, top, height, maxWidth, maxHeight } = this.calculateWidth();

		if (this.anchorRef.current) {
			this.setState({
				location: {
					left: Math.floor(left),
					top: Math.floor(top),
					width,
					height,
					maxWidth,
					maxHeight,
				},
			});
		}
	}

	public render(): JSX.Element {
		const { location } = this.state;

		return (
			<Portal>
				<div className="anchor" style={{ position: 'fixed', ...location, zIndex: 100000, overflow: 'hidden' }} ref={this.anchorRef}>
					{this.props.children}
				</div>

				<EventListener target={window} onResize={this.setPosition} onScroll={this.setPosition} />
			</Portal>
		);
	}
}
