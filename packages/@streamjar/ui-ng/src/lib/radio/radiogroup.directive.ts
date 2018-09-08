import {
	forwardRef,
	ContentChildren,
	Directive,
	Input,
	QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { JarRadioComponent } from './radio.component';

export const JAR_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarRadioGroupDirective),
};

@Directive({
	providers: [JAR_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
	selector: '[jarRadioGroup]',
})
export class JarRadioGroupDirective implements ControlValueAccessor {

	@Input()
	public name: string;

	@ContentChildren(forwardRef(() => JarRadioComponent))
	public radios: QueryList<JarRadioComponent> = null;

	public value = new BehaviorSubject<string>(null);

	public onChange = (val?: string) => undefined;
	public onTouch = (val?: string) => undefined;

	public writeValue(value: any): void {
		this.value.next(value);
	}

	/**
	 * Registers a callback to be triggered when the model value changes.
	 * Implemented as part of ControlValueAccessor.
	 * @param fn Callback to be registered.
	 */
	public registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	/**
	 * Registers a callback to be triggered when the control is touched.
	 * Implemented as part of ControlValueAccessor.
	 * @param fn Callback to be registered.
	 */
	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}
}
