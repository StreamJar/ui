import {RippleConfig, RippleRenderer} from './ripple-renderer';

/** Possible states for a ripple element. */
export enum RippleState {
	HIDDEN,
	FADING_IN,
	VISIBLE,
	FADING_OUT,
};

/**
* Reference to a previously launched ripple element.
*/
export class RippleRef {

	/** Current state of the ripple reference. */
	public state: RippleState = RippleState.HIDDEN;

	constructor(
		private renderer: RippleRenderer,
		public element: HTMLElement,
		public config: RippleConfig,
	) { }

	/** Fades out the ripple element. */
	public fadeOut() {
		this.renderer.fadeOutRipple(this);
	}
}
