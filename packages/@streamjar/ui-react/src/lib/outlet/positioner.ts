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

const pullTo = (side: string, start: number, end: number, targetSize: number): number => {
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

export const position = (type: string, pull: string, anchor: IAnchor, target: ITarget, offset: number): { top: number; left: number } => {
	switch (type) {
		case 'top': {
			return {
				left: pullTo(pull, anchor.left, anchor.right, target.width),
				top: anchor.top - target.height - offset,
			};
		}

		case 'bottom': {
			return {
				left: pullTo(pull, anchor.left, anchor.right, target.width),
				top: anchor.bottom + offset,
			};
		}

		case 'left': {
			return {
				left: anchor.left - target.width - offset,
				top: pullTo(pull, anchor.top, anchor.bottom, target.height),
			};
		}

		case 'right': {
			return {
				left: anchor.right + offset,
				top: pullTo(pull, anchor.top, anchor.bottom, target.height),
			};
		}
	}

	return { top: 0, left: 0 };
};
