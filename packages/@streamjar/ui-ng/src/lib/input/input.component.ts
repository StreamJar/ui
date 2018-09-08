import { ErrorMessageService } from './error-message.service';
import { BehaviorSubject } from 'rxjs';
import { forwardRef, Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild, SkipSelf, Host, Optional, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl, NgControl } from '@angular/forms';

export const JAR_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarInputComponent),
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [JAR_INPUT_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-input',
	templateUrl: './input.component.html',
})
export class JarInputComponent implements ControlValueAccessor, OnInit {
	public focus$ = new BehaviorSubject(false);
	public error$ = new BehaviorSubject('');
	public internalValue = '';

	private control: AbstractControl;

	@Input()
	public minlength: string = null;

	@Input()
	public maxlength: string = null;

	@Input()
	public min: string = null;

	@Input()
	public max: string = null;

	@Input()
	public step: string = null;

	@Input()
	public pattern: string = null;

	@Input()
	public readonly = false;

	@Input()
	public title = '';

	@Input()
	public type = 'text';

	@Input()
	public placeholder = '';

	@Input()
	public formControlName: string;

	@Input()
	public validationErrors: { [key: string]: string } = {};

	@ViewChild('el')
	public el;

	public onChange = (val?: string) => undefined;
	public onTouch = (val?: string) => undefined;

	constructor(
		private cd: ChangeDetectorRef,
		@Optional() @Host() @SkipSelf()
		private controlContainer: ControlContainer,
		private injector: Injector,
		private errors: ErrorMessageService,
	) {

	}

	@Input()
	get value() {
		return this.internalValue;
	}

	set value(obj: any) {
		this.internalValue = obj;
		this.onChange(this.internalValue);
		this.parseErrors();
	}

	public writeValue(obj: any): void {
		this.internalValue = obj;
		this.cd.detectChanges();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public ngOnInit(): void {
		// Use our local input.
		this.control = this.el.control;
		const ngControl: NgControl = this.injector.get(NgControl, null);

		// fall back onto ngModel
		if (ngControl && ngControl.control) {
			this.control = ngControl.control;
		}

		// If we're using formControlName, we should fetch that
		else if (this.controlContainer) {
			if (this.formControlName && this.controlContainer.control.get(this.formControlName)) {
				this.control = this.controlContainer.control.get(this.formControlName);
			}
		}

		this.parseErrors();
	}

	private parseErrors(): void {
		if (!this.control || !this.control.errors) {
			this.error$.next('');

			return;
		}

		const error = Object.keys(this.control.errors)[0];

		if (!error) {
			this.error$.next('');

			return;
		}

		this.error$.next(this.errors.get(error, this.control.errors[error], this.validationErrors));
	}

	public focus(isFocus: boolean): void {
		this.focus$.next(isFocus);
	}
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-input-prefix',
	styles: ['span { font-weight: bold; padding: 0px 0px 0px 5px; }'],
	template: '<span><ng-content></ng-content></span>',
})
export class JarInputPrefixComponent {

}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-input-suffix',
	styles: ['span { font-weight: bold; padding: 0px 5px; }'],
	template: '<span><ng-content></ng-content></span>',
})
export class JarInputSuffixComponent {

}
