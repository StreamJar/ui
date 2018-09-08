import { ElementRef, NgZone } from '@angular/core';
import { RippleRef, RippleState } from './ripple-ref';
import { ViewportRuler } from './ruler';

/** Fade-in duration for the ripples. Can be modified with the speedFactor option. */
export const RIPPLE_FADE_IN_DURATION = 450;

/** Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor. */
export const RIPPLE_FADE_OUT_DURATION = 400;

export interface RippleConfig {
	color?: string;
	centered?: boolean;
	radius?: number;
	speedFactor?: number;
	persistent?: boolean;
};

/**
* Helper service that performs DOM manipulations. Not intended to be used outside this module.
* The constructor takes a reference to the ripple directive's host element and a map of DOM
* event handlers to be installed on the element that triggers ripple animations.
* This will eventually become a custom renderer once Angular support exists.
* @docs-private
*/
/* tslint:disable only-arrow-functions */
export class RippleRenderer {

	/** Element where the ripples are being added to. */
	private _containerElement: HTMLElement;

	/** Element which triggers the ripple elements on mouse events. */
	private _triggerElement: HTMLElement;

	/** Whether the mouse is currently down or not. */
	private _isMousedown = false;

	/** Events to be registered on the trigger element. */
	private _triggerEvents = new Map<string, any>();

	/** Set of currently active ripple references. */
	private _activeRipples = new Set<RippleRef>();

	/** Ripple config for all ripples created by events. */
	public rippleConfig: RippleConfig = {};

	/** Whether mouse ripples should be created or not. */
	public rippleDisabled = false;

	constructor(_elementRef: ElementRef, private _ngZone: NgZone, private _ruler: ViewportRuler) {
		this._containerElement = _elementRef.nativeElement;

		// Specify events which need to be registered on the trigger.
		this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
		this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
		this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));

		// By default use the host element as trigger element.
		this.setTriggerElement(this._containerElement);
	}

	/** Fades in a ripple at the given coordinates. */
	public fadeInRipple(pageX: number, pageY: number, config: RippleConfig = {}): RippleRef {
		const containerRect = this._containerElement.getBoundingClientRect();

		if (config.centered) {
			pageX = containerRect.left + containerRect.width / 2;
			pageY = containerRect.top + containerRect.height / 2;
		} else {
			// Subtract scroll values from the coordinates because calculations below
			// are always relative to the viewport rectangle.
			const scrollPosition = this._ruler.getViewportScrollPosition();
			pageX -= scrollPosition.left;
			pageY -= scrollPosition.top;
		}

		const radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
		const duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
		const offsetX = pageX - containerRect.left;
		const offsetY = pageY - containerRect.top;

		const ripple = document.createElement('div');
		ripple.classList.add('mat-ripple-element');

		ripple.style.left = `${offsetX - radius}px`;
		ripple.style.top = `${offsetY - radius}px`;
		ripple.style.height = `${radius * 2}px`;
		ripple.style.width = `${radius * 2}px`;

		// If the color is not set, the default CSS color will be used.
		ripple.style.backgroundColor = config.color;
		ripple.style.transitionDuration = `${duration}ms`;

		this._containerElement.appendChild(ripple);

		// By default the browser does not recalculate the styles of dynamically created
		// ripple elements. This is critical because then the `scale` would not animate properly.
		enforceStyleRecalculation(ripple);

		ripple.style.transform = 'scale(1)';

		// Exposed reference to the ripple that will be returned.
		const rippleRef = new RippleRef(this, ripple, config);

		rippleRef.state = RippleState.FADING_IN;

		// Add the ripple reference to the list of all active ripples.
		this._activeRipples.add(rippleRef);

		// Wait for the ripple element to be completely faded in.
		// Once it's faded in, the ripple can be hidden immediately if the mouse is released.
		this.runTimeoutOutsideZone(() => {
			rippleRef.state = RippleState.VISIBLE;

			if (!config.persistent && !this._isMousedown) {
				rippleRef.fadeOut();
			}
		}, duration);

		return rippleRef;
	}

	/** Fades out a ripple reference. */
	public fadeOutRipple(rippleRef: RippleRef) {
		// For ripples that are not active anymore, don't re-un the fade-out animation.
		if (!this._activeRipples.delete(rippleRef)) {
			return;
		}

		const rippleEl = rippleRef.element;

		rippleEl.style.transitionDuration = `${RIPPLE_FADE_OUT_DURATION}ms`;
		rippleEl.style.opacity = '0';

		rippleRef.state = RippleState.FADING_OUT;

		// Once the ripple faded out, the ripple can be safely removed from the DOM.
		this.runTimeoutOutsideZone(() => {
			rippleRef.state = RippleState.HIDDEN;
			rippleEl.parentNode.removeChild(rippleEl);
		}, RIPPLE_FADE_OUT_DURATION);
	}

	/** Fades out all currently active ripples. */
	public fadeOutAll() {
		this._activeRipples.forEach(ripple => ripple.fadeOut());
	}

	/** Sets the trigger element and registers the mouse events. */
	public setTriggerElement(element: HTMLElement) {
		// Remove all previously register event listeners from the trigger element.
		if (this._triggerElement) {
			this._triggerEvents.forEach((fn, type) => this._triggerElement.removeEventListener(type, fn));
		}

		if (element) {
			// If the element is not null, register all event listeners on the trigger element.
			this._ngZone.runOutsideAngular(() => {
				this._triggerEvents.forEach((fn, type) => element.addEventListener(type, fn));
			});
		}

		this._triggerElement = element;
	}

	/** Listener being called on mousedown event. */
	private onMousedown(event: MouseEvent) {
		if (!this.rippleDisabled) {
			this._isMousedown = true;
			this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
		}
	}

	/** Listener being called on mouseup event. */
	private onMouseup() {
		this._isMousedown = false;

		// Fade-out all ripples that are completely visible and not persistent.
		this._activeRipples.forEach(ripple => {
			if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
				ripple.fadeOut();
			}
		});
	}

	/** Listener being called on mouseleave event. */
	private onMouseLeave() {
		if (this._isMousedown) {
			this.onMouseup();
		}
	}

	/** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
	private runTimeoutOutsideZone(fn: Function, delay = 0) {
		this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
	}

}

/** Enforces a style recalculation of a DOM element by computing its styles. */
// TODO(devversion): Move into global utility function.
function enforceStyleRecalculation(element: HTMLElement) {
	// Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
	// Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
	// See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
	window.getComputedStyle(element).getPropertyValue('opacity');
}

/**
* Returns the distance from the point (x, y) to the furthest corner of a rectangle.
*/
function distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
	const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
	const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));

	return Math.sqrt(distX * distX + distY * distY);
}
