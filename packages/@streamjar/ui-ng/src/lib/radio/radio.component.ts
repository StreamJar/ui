import {
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	ViewChild,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { JarRadioGroupDirective } from './radiogroup.directive';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-radio',
	styles: [`:host { outline: none; }`],
	templateUrl: 'radio.component.html',
})
export class JarRadioComponent implements OnDestroy {
	@Input()
	public value: string;

	@Input()
	set disabled(value: boolean) {
		this.disabled$.next(!(value === false));
	}

	@HostBinding('attr.tabIndex')
	public tabIndex = 0;

	@ViewChild('input', { static: true })
	public input: ElementRef;

	public name: string;
	public disabled$ = new BehaviorSubject(false);
	public checked$ = new BehaviorSubject(false);
	public focused: boolean;

	public subscriptions: Subscription[] = [];

	constructor(private radioGroup: JarRadioGroupDirective, private cd: ChangeDetectorRef) {
		this.checked$.next(radioGroup.value.getValue() === this.value);
		this.name = radioGroup.name;

		this.subscriptions.push(this.radioGroup.value.subscribe(val => {
			this.checked$.next(this.value === val);
		}));
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	@HostListener('focus')
	public gainedFocus(): void {
		if (this.disabled$.getValue()) {
			return;
		}

		this.focused = true;
	}

	@HostListener('blur')
	public lostFocus(): void {
		this.focused = false;
	}

	@HostListener('click')
	public click(): void {
		this.input.nativeElement.click();
	}

	public onInputClick(e): boolean {
		e.stopPropagation();

		if (this.disabled$.getValue()) {
			return;
		}

		this.radioGroup.value.next(this.value);
		this.radioGroup.onChange(this.value);

		return false;
	}

	public onInputChange(): void {
		if (this.disabled$.getValue()) {
			return;
		}

		this.radioGroup.value.next(this.value);
		this.radioGroup.onChange(this.value);
	}
}
