import { Directive, ElementRef, HostBinding, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { RippleRef } from './ripple-ref';
import { RippleConfig, RippleRenderer } from './ripple-renderer';
import { ViewportRuler } from './ruler';

/* tslint:disable no-input-rename directive-class-suffix */
@Directive({
	exportAs: 'mdRipple',
	selector: '[md-ripple], [mat-ripple]', // tslint:disable-line
})
export class MdRipple implements OnChanges, OnDestroy {

	@HostBinding('class.mat-ripple')
	public matRipple = true;

	@HostBinding('class.mat-ripple-unbounded')
	public matRippleUnbounded = 'unbounded';

	@Input('mdRippleTrigger')
	public trigger: HTMLElement|HTMLElement;

	@Input('mdRippleCentered')
	public centered: boolean;

	@Input('mdRippleDisabled')
	public disabled: boolean;

	@Input('mdRippleRadius')
	public radius = 0;

	@Input('mdRippleSpeedFactor')
	public speedFactor = 1;

	@Input('mdRippleColor')
	public color: string;

	/** Whether foreground ripples should be visible outside the component's bounds. */
	@Input('mdRippleUnbounded')
	public unbounded: boolean;

	/** Renderer for the ripple DOM manipulations. */
	private _rippleRenderer: RippleRenderer;

	constructor(elementRef: ElementRef, ngZone: NgZone, ruler: ViewportRuler) {
		this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler);
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes['trigger'] && this.trigger) {
			this._rippleRenderer.setTriggerElement(this.trigger);
		}

		this._rippleRenderer.rippleDisabled = this.disabled;
		this._rippleRenderer.rippleConfig = this.rippleConfig;
	}

	public ngOnDestroy() {
		// Set the trigger element to null to cleanup all listeners.
		this._rippleRenderer.setTriggerElement(null);
	}

	/** Launches a manual ripple at the specified position. */
	public launch(pageX: number, pageY: number, config = this.rippleConfig): RippleRef {
		return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
	}

	/** Fades out all currently showing ripple elements. */
	public fadeOutAll() {
		this._rippleRenderer.fadeOutAll();
	}

	/** Ripple configuration from the directive's input values. */
	get rippleConfig(): RippleConfig {
		return {
			centered: this.centered,
			color: this.color,
			radius: this.radius,
			speedFactor: this.speedFactor,
		};
	}
}
