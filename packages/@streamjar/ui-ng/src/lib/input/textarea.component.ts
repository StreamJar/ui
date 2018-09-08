import {  forwardRef, Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';

export const JAR_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarTextareaComponent),
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [JAR_TEXTAREA_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-textarea',
	templateUrl: './textarea.component.html',
})
export class JarTextareaComponent {
	@Input()
	public readonly = false;

	@Input()
	public maxlength = null;

	@Input()
	public placeholder = '';

	@Input()
	public title = '';

	@Input()
	public rows: number;

	public resizeInput = false;
	public internalValue = '';

	public onChange = (val?: string) => undefined;
	public onTouch = (val?: string) => undefined;

	constructor(private cd: ChangeDetectorRef) {

	}

	@Input()
	get value() {
		return this.internalValue;
	}

	set value(obj: any) {
		this.internalValue = obj;
		this.onChange(this.internalValue);
	}

	@Input()
	set resize(resize) {
		this.resizeInput = resize !== false;
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
}
