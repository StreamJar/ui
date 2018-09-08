import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'button[jarBtn],a[jarBtn]', // tslint:disable-line
	templateUrl: './button.component.html',
})
export class JarButtonComponent {
	public customBtn$ = new BehaviorSubject<boolean>(false);
	public raisedBtn$ = new BehaviorSubject<boolean>(false);
	public disabledBtn$ = new BehaviorSubject<boolean>(false);
	public iconBtn$ = new BehaviorSubject<boolean>(false);
	public right$ = new BehaviorSubject<boolean>(false);
	public theme$ = new BehaviorSubject<string>('primary');
	public iconVal$ = new BehaviorSubject<string>('');

	@Input()
	set colour(colour) {
		this.theme$.next(colour);
	}

	@Input()
	set custom(custom: boolean) {
		this.customBtn$.next(custom !== false);
	}

	@Input()
	set raised(raised: boolean) {
		this.raisedBtn$.next(raised !== false);
	}

	@Input()
	set disabled(disabled: boolean) {
		if (disabled !== false) {
			this.renderer2.setAttribute(this._elementRef.nativeElement, 'disabled', '');
		} else {
			this.renderer2.removeAttribute(this._elementRef.nativeElement, 'disabled');
		}

		this.disabledBtn$.next(disabled !== false);
	}

	@Input()
	set round(icon: boolean) {
		this.iconBtn$.next(icon !== false);
	}

	@Input()
	set icon(icon: string) {
		this.iconVal$.next(icon);
	}

	@Input('icon-right')
	set iconRight(icon) {
		this.right$.next(icon !== false);
	}

	constructor(private _elementRef: ElementRef, private renderer2: Renderer2) {}

	public _getHostElement(): HTMLElement {
		return this._elementRef.nativeElement;
	}
}
