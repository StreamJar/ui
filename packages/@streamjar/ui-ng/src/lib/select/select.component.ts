import {
	forwardRef,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import { JarMenuComponent } from '../menu/menu.component';
import { JarSelectItemComponent } from './selectItem.component';

export const JAR_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
	multi: true,
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => JarSelectComponent),
};

export enum Mode {
	Single,
	Multiple,
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [JAR_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
	selector: 'jar-select',
	templateUrl: './select.component.html',
})
export class JarSelectComponent implements ControlValueAccessor, OnDestroy, OnInit {
	@Input()
	public title: string;

	@ContentChildren(forwardRef(() => JarSelectItemComponent))
	public items: QueryList<JarSelectItemComponent> = null;

	public Mode = Mode;
	public mode = Mode.Single;
	private shown = false;
	public status$ = new BehaviorSubject(false);
	public value$ = new BehaviorSubject<string[]>([]);

	public onChange = (val?: any) => undefined;
	public onTouch = (val?: any) => undefined;
	public subscriptions: Subscription[] = [];

	@ViewChild('menu')
	public menu: JarMenuComponent;

	@Input()
	set multiple(value: boolean) {
		this.mode = value !== false ? Mode.Multiple : Mode.Single;
	}

	constructor(
		private elementRef: ElementRef,
		private cd: ChangeDetectorRef,
	) {
		document.addEventListener('click', this.handleClick.bind(this));
	}

	public ngOnInit(): void {
		this.subscriptions.push(this.value$.subscribe(val => {
			if (this.mode === Mode.Multiple) {
				this.onChange(val);
			} else {
				this.onChange(val[0] || '');
			}

			this.cd.detectChanges();
		}));
	}

	public ngOnDestroy(): void {
		document.removeEventListener('click', this.handleClick.bind(this));

		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	public handleClick(event: Event): boolean {
		event.stopPropagation();

		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.shown = false;
		}

		return false;
	}

	@HostListener('click')
	public click(): void {
		if (!this.shown) {
			document.addEventListener('click', this.handleClick.bind(this));
		}

		this.status$.next(this.status$.getValue());
	}

	public clean(items: string[]): string[] {
		return items.filter(item => this.getValue(item) !== '');
	}

	public writeValue(value: any): void {
		if (this.mode === Mode.Multiple) {
			if (value) {
				this.value$.next(this.clean(value));
			} else {
				this.value$.next([]);
			}
		} else {
			this.value$.next([ value ]);
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

	public getValue(val: string): string{
		if (!this.items) {
			return '';
		}

		const items = this.items.filter(item => item.value === val);

		return items.length ? items[0].name : '';
	}
}
