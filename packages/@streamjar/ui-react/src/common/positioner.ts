export type IAnchorType = 'top' | 'left' | 'bottom' | 'right';
export type IAnchorSide = 'start' | 'center' | 'end';

export interface IAnchor {
	width: number;
	height: number;

	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface ITarget {
	width: number;
	height: number;
}

export interface IPosition {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
	maxWidth?: number;
	maxHeight?: number;
}

export interface IWindowBounds {
	width: number;
	height: number;
}

/**
 * Automatically pick whether to top align or bottom align
 * based on free space.
 */
export function pickBestPosition(axis: 'horizontal' | 'vertical', anchor: IAnchor, target: ITarget, bounds: IWindowBounds): IAnchorType {
	let windowSize: number = 0;

	if (axis === 'horizontal') {
		windowSize = bounds.width - anchor.right;

		// If we know it fits to the right, great.
		if (windowSize >= target.width) {
			return 'right';
		}

		return anchor.left < windowSize ? 'right' : 'left';
	}

	windowSize = bounds.height - anchor.bottom;

	// If we know it fits below, great.
	if (windowSize >= target.height) {
		return 'bottom';
	}

	return anchor.top < windowSize ? 'bottom' : 'top';
}

export const pullTo = (side: IAnchorSide, start: number, end: number, targetSize: number): number => {
	switch (side) {
		case 'start': {
			return start;
		}

		case 'center': {
			return (start + (end - start) / 2) - (targetSize / 2);
		}

		case 'end': {
			return end - targetSize;
		}
	}

	return 0;
};

/**
 * Positions an element somewhere on the screen
 *
 * @param axis Axis to align
 * @param pull Alignment on opposing axis
 * @param anchor Current element anchor
 * @param target todo
 * @param offset Amount tooffset by
 */
export const position = (
	axis: 'horizontal' | 'vertical',
	pull: IAnchorSide,
	anchor: IAnchor,
	floatingTarget: ITarget,
	offset: number,
	pageOffset: number,
	window: { width: number; height: number },
): IPosition => {
	const type = pickBestPosition(
		axis,
		anchor,
		floatingTarget,
		window,
	);

	switch (type) {
		case 'top': {
			return {
				left: Math.max(pageOffset, pullTo(pull, anchor.left, anchor.right, floatingTarget.width)),
				bottom: window.height - anchor.top + offset,
				maxHeight: Math.min(floatingTarget.height, anchor.top - pageOffset - offset),
			};
		}

		case 'bottom': {
			return {
				left: Math.max(pageOffset, pullTo(pull, anchor.left, anchor.right, floatingTarget.width)),
				top: Math.max(pageOffset, anchor.bottom + offset),
				maxHeight: Math.min(floatingTarget.height, window.height - anchor.bottom - pageOffset - offset),
			};
		}

		case 'left': {
			return {
				right: window.width - anchor.left + offset,
				top: Math.max(pageOffset, pullTo(pull, anchor.top, anchor.bottom, floatingTarget.height)),
				maxWidth: anchor.left - pageOffset - offset,
			};
		}

		case 'right': {
			return {
				left: Math.max(pageOffset, anchor.right + offset),
				top: Math.max(pageOffset, pullTo(pull, anchor.top, anchor.bottom, floatingTarget.height)),
				maxWidth: window.width - anchor.right - pageOffset - offset,
			};
		}
	}

	return { top: 0, left: 0 };
};
