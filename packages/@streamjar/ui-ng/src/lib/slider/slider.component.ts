import { forwardRef, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export const JAR_SLIDER_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarSliderComponent),
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [JAR_SLIDER_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-slider',
	templateUrl: 'slider.component.html',

})
export class JarSliderComponent implements ControlValueAccessor {
	public slider$ = new BehaviorSubject(0);

	@Input()
	public min = 0;

	@Input()
	public max = 100;

	@Input()
	public step = 1;

	@Input()
	public disabled = false;

	public subscriptions: Subscription[] = [];

	public onChange = (val?: any) => undefined;
	public onTouch = (val?: any) => undefined;


	public ngOnInit() {
		this.subscriptions.push(
			this.slider$
			.pipe(distinctUntilChanged())
			.subscribe(val => this.onChange(val))
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	// Incoming value
	public writeValue(value: any): void {
		if (!value) {
			this.slider$.next(0);
		} else {
			this.slider$.next(value);
		}
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
