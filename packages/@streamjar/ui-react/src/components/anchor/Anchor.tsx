import * as React from 'react';
import { default as EventListener } from 'react-event-listener';

import { Portal } from '../portal/Portal';
import { position, pickBestPosition, IAnchorSide, IAnchorType } from '../../common/positioner';
import ReactResizeDetector from 'react-resize-detector';

export interface IAnchorProps {
	/** Force an item width */
	width?: number;

	/** Force an item height */
	height?: number;

	/** Force an max item width */
	maxWidth?: number;

	/** Force an max item height */
	maxHeight?: number;

	/** The axis to anchor on  */
	axis?: 'vertical' | 'horizontal';

	/** Where to pull on the oposing axis */
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

	/** Whether we should handle overflowing content */
	handleOverflow?: boolean;
}

/**
 * Anchor an element to another element
 */
export const Anchor: React.FC<React.PropsWithChildren<IAnchorProps>> = (props: React.PropsWithChildren<IAnchorProps>) => {
	const {
		width,
		height,
		anchorTo,
		matchAnchorHeight,
		matchAnchorWidth,
		axis,
		pull,
		offset,
		pageOffset,
		children,
		handleOverflow,
		maxWidth: elMaxWidth,
		maxHeight: elMaxHeight,
	} = props;

	const anchorRef = React.useRef<HTMLDivElement>(null);
	const [location, setLocation] = React.useState<React.CSSProperties>({});

	const calculatePosition = (dynSize?: { width: number; height: number}) => {
		let targetChild = anchorRef.current!;

		if (anchorRef.current!.firstElementChild) {
			targetChild = anchorRef.current!.firstElementChild as any;
		}

		let modifiedWidth: number | undefined = width ? width : undefined;
		let modifiedHeight: number | undefined = height ? height : undefined;
		let itemWidth = width ? width : targetChild.scrollWidth;
		let itemHeight = height ? height : targetChild.scrollHeight;

		if (matchAnchorWidth) {
			itemWidth = anchorTo.getBoundingClientRect().width;
			modifiedWidth = anchorTo.getBoundingClientRect().width;
		}

		if (matchAnchorHeight) {
			itemHeight = anchorTo.getBoundingClientRect().height;
			modifiedHeight = anchorTo.getBoundingClientRect().height;
		}

		const anchorBounds = anchorTo.getBoundingClientRect();
		let { left, top, right, bottom, maxWidth, maxHeight } = position( // tslint:disable-line
			axis!,
			pull!,
			anchorBounds, {
				height: itemHeight,
				width: itemWidth,
			},
			offset!,
			pageOffset!,
			{
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			},
		);

		return {
			width: modifiedWidth,
			height: modifiedHeight,
			left,
			right,
			bottom,
			top,
			maxWidth: maxWidth ? Math.min(maxWidth, elMaxWidth!) : undefined,
			maxHeight: maxHeight ? Math.min(maxHeight, elMaxHeight!) : undefined,
		};
	};

	const setPosition = (a?: any) => {
		setLocation(calculatePosition(a));
	};

	React.useEffect(() => {
		setPosition();

		// When the box isn't drawn, we need to wait
		requestAnimationFrame(() => {
			setPosition();
		});
	},              []);

	const overflow = handleOverflow ? 'auto' : 'visible';

	return (
		<Portal>
			<div className="jar-anchor" style={{position: 'fixed', ...location, zIndex: 100000, overflow }} ref={anchorRef}>
				<ReactResizeDetector onResize={setPosition}>
					{() => children}
				</ReactResizeDetector>
			</div>

			<EventListener target={window} onResize={setPosition} onScroll={setPosition} />
		</Portal>
	);
};

Anchor.defaultProps = {
	offset: 5,
	pageOffset: 5,
	axis: 'vertical',
	pull: 'center',
	handleOverflow: true,
	maxWidth: Infinity,
	maxHeight: Infinity,
};
