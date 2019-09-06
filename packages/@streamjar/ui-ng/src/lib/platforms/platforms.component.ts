import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

export const JAR_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => PlatformsComponent),
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [JAR_CHECKBOX_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-platforms',
	templateUrl: './platforms.component.html',
})
export class PlatformsComponent implements ControlValueAccessor, OnInit, OnDestroy {
	public static platforms = ['mixer', 'twitch', 'smashcast', 'dlive', 'picarto']
	public all$ = new BehaviorSubject(true);
	public value$ = new BehaviorSubject([...PlatformsComponent.platforms]);
	public remainingCount = 0;
	public subscriptions: Subscription[] = [];

	@Input()
	public supported = PlatformsComponent.platforms;

	private onChange = (val?: boolean) => undefined;
	private onTouch = (val?: boolean) => undefined;

	constructor(private cd: ChangeDetectorRef) {
	}

	public ngOnInit(): void {
		this.value$.next(this.supported);

		this.subscriptions.push(this.all$.pipe(skip(1)).subscribe(val => {
			if (val === true) {
				this.setValue([...this.supported]);
			}
		}));

		this.subscriptions.push(this.value$.subscribe(val => {
			this.remainingCount = (val || []).length

			this.cd.detectChanges();
		}));
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	public setValue(value: any): void {
		this.value$.next(value);
		this.onChange(value);
	}

	public writeValue(obj: any): void {
		if (!obj) {
			this.setValue([...this.supported]);

			return;
		}

		this.value$.next(obj);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public toggle(name: string): void {
		if (this.all$.getValue()) {
			return;
		}

		if (this.value$.getValue().indexOf(name) !== -1) {
			this.setValue(this.value$.getValue().filter(a => a !== name));
		} else {
			this.setValue([...this.value$.getValue(), name]);
		}
	}

	public dismissAll(): void {
		if (this.all$.getValue()) {
			this.all$.next(false);
		}
	}
}
