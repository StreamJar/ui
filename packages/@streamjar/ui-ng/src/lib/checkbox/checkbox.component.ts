import { forwardRef,
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	ViewChild,
	OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const JAR_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarCheckboxComponent),
};

@Component({
	providers: [JAR_CHECKBOX_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-checkbox',
	styles: [`:host { outline: none; }`],
	templateUrl: './checkbox.component.html',
})
export class JarCheckboxComponent implements ControlValueAccessor, OnDestroy {
	public isDisabled$ = new BehaviorSubject(false);
	public noRipple$ = new BehaviorSubject(false);
	public inverse$ = new BehaviorSubject(false);
	public checked$ = new BehaviorSubject(false);
	public label$ = new BehaviorSubject(false);
	public theme$ = new BehaviorSubject('primary');
	public focused = false;
	public wasClicked = false;
	public subscriptions: Subscription[] = [];

	@ViewChild('input', { static: true })
	public checkbox: ElementRef;

	@HostBinding('attr.tabIndex')
	public tabIndex = 0;

	private onChange = (val?: boolean) => undefined;
	private onTouch = (val?: boolean) => undefined;

	@Input()
	set disabled(value: boolean) {
		this.isDisabled$.next(value !== false);
	}

	@Input('no-ripple')
	set ripple(value: boolean) {
		this.noRipple$.next(value !== false);
	}

	@Input('inverse')
	set isInverse(value: boolean) {
		this.inverse$.next(value !== false);
	}

	@Input('label')
	set setLabel(value: boolean) {
		this.label$.next(value !== false);
	}


	@Input('colour')
	set setTheme(value: string) {
		this.theme$.next(value);
	}

	@Input()
	set checked(value: boolean) {
		this.checked$.next(value !== false);
	}

	constructor(private _elementRef: ElementRef) {
		this.subscriptions.push(this.checked$
			.pipe(distinctUntilChanged())
			.subscribe(val => {
				this.onChange(this.inverse$.getValue() ? !val : val);
			}));
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	public _getHostElement(): HTMLElement {
		return this._elementRef.nativeElement;
	}

	public toggle(): void {
		if (this.checked$.getValue()) {
			this.checked$.next(false);
		} else {
			this.checked$.next(true);
		}
	}

	public onInputChange(): void {
		this.toggle();
	}

	public writeValue(obj: any): void {
		this.checked$.next(this.inverse$.getValue() ? !obj : !!obj);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	@HostListener('focus')
	public gainedFocus(): void {
		this.focused = true;
	}

	@HostListener('blur')
	public lostFocus(): void {
		this.focused = false;
	}

	@HostListener('click')
	public click() : void {
		if (this.isDisabled$.getValue()) {
			return;
		}

		this.checkbox.nativeElement.click();
	}
}
