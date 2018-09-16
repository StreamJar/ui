import * as React from 'react';
import { default as EventListener } from 'react-event-listener';

import { Portal } from './portal';
import { position } from './positioner';

export interface IAnchorProps {
	width: number;
	position: string; // top left bottom right
	pull: string; // start | center | end of item
	el: HTMLElement;
	offset: number;
	anchorWidth: boolean;
}

export interface IAnchorState {
	location: {
		width: number;
		top: number;
		left: number;
	};
}

export class Anchor extends React.PureComponent<IAnchorProps, IAnchorState> {
	public static defaultProps: Partial<IAnchorProps> = {
		offset: 0,
		position: 'bottom',
		pull: 'center',
	};

	public anchorRef: React.RefObject<HTMLDivElement>;

	constructor(props: IAnchorProps) {
		super(props);

		this.anchorRef = React.createRef();
		this.setPosition = this.setPosition.bind(this);
	}

	public componentDidMount(): void {
		this.setPosition();
	}

	public calculateWidth(): { width: number; left: number; top: number; height: number } {
		let itemWidth = this.props.width ? this.props.width : this.anchorRef.current!.getBoundingClientRect().width;
		let itemHeight = this.anchorRef.current!.getBoundingClientRect().height;

		if (this.props.anchorWidth) {
			itemWidth = this.props.el.getBoundingClientRect().width;
		}

		const windowWidth = document.documentElement.clientWidth;
		const windowHeight = document.documentElement.clientHeight;

		let { left, top } = position(this.props.position, this.props.pull, this.props.el.getBoundingClientRect(), {
			height: itemHeight,
			width: itemWidth,
		},                           this.props.offset);

		// If item is larger than window, 100%
		if (itemWidth >= windowWidth) {
			itemWidth = windowWidth - this.props.offset - this.props.offset;
			left = this.props.offset;
		}

		if (itemHeight >= windowHeight) {
			itemHeight = windowHeight - this.props.offset - this.props.offset;
			top = this.props.offset;
		}

		if (left + itemWidth >= windowWidth) {
			left = windowWidth - this.props.offset - itemWidth;
		}

		if (top + itemHeight >= windowHeight) {
			top = windowHeight - this.props.offset - itemHeight;
		}

		if (top < 0) {
			top = this.props.offset;
		}

		if (left < 0) {
			left = this.props.offset;
		}

		return { width: itemWidth, height: itemHeight, left, top };
	}

	public setPosition(): void  {
		const { width, left, top, height } = this.calculateWidth();

		if (this.anchorRef.current) {
			this.anchorRef.current.style.left = `${Math.floor(left)}px`;
			this.anchorRef.current.style.top = `${Math.floor(top)}px`;
			this.anchorRef.current.style.width = `${width}px`;
			this.anchorRef.current.style.height = `${height}px`;
		}
	}

	public render(): JSX.Element {
		return (
			<Portal>
				<div className="anchor" style={{ position: 'fixed' }} ref={this.anchorRef}>
					{this.props.children}
				</div>

				<EventListener target={window} onResize={this.setPosition} onScroll={this.setPosition} />
			</Portal>
		);
	}
}
