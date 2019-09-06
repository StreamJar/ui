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

const pullTo = (side: IAnchorSide, start: number, end: number, targetSize: number): number => {
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
 * @param type Axis to align
 * @param pull Alignment on opposing axis
 * @param anchor Current element anchor
 * @param target todo
 * @param offset Amount tooffset by
 */
export const position = (
	type: IAnchorType,
	pull: IAnchorSide,
	anchor: IAnchor,
	target: ITarget,
	offset: number,
): IAnchor => {
	switch (type) {
		case 'top': {
			return {
				...anchor,
				left: pullTo(pull, anchor.left, anchor.right, target.width),
				top: anchor.top - target.height - offset,
			};
		}

		case 'bottom': {
			return {
				...anchor,
				left: pullTo(pull, anchor.left, anchor.right, target.width),
				top: anchor.bottom + offset,
			};
		}

		case 'left': {
			return {
				...anchor,
				left: anchor.left - target.width - offset,
				top: pullTo(pull, anchor.top, anchor.bottom, target.height),
			};
		}

		case 'right': {
			return {
				...anchor,
				left: anchor.right + offset,
				top: pullTo(pull, anchor.top, anchor.bottom, target.height),
			};
		}
	}

	return { ...anchor, top: 0, left: 0 };
};
