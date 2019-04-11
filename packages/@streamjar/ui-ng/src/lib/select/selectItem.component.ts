import { ChangeDetectionStrategy, Component, ElementRef, Injector, Input, ChangeDetectorRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';

import { JarSelectComponent, Mode } from './select.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-select-item',
	templateUrl: './selectItem.component.html',
})
export class JarSelectItemComponent implements OnInit, OnDestroy {
	public Mode = Mode;
	public name: string;
	public value: string;

	public visible$ = new BehaviorSubject(true);

	public set searchTerm(value: string) {
		this.visible$.next(!value || (this.name.toLowerCase().trim().includes(value.toLowerCase().trim())));
	}

	public subscriptions: Subscription[] = [];

	@Input('value')
	set setValue(value: string) {
		this.value = value;
	}

	@Input('name')
	set setName(name: string) {
		this.name = name;
	}

	public checked = false;
	public mode: string;
	public select: JarSelectComponent;

	constructor(private _elementRef: ElementRef, injector: Injector, private cd: ChangeDetectorRef) {
		this.select = injector.get(JarSelectComponent);
	}

	public ngOnInit(): void {
		this.subscriptions.push(this.select.value$
			.subscribe(value => {
				this.checked = (value.indexOf(this.value) !== -1);

				this.cd.detectChanges();
			}));
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	public _getHostElement(): HTMLElement {
		return this._elementRef.nativeElement;
	}

	public has(val: string | string[]): boolean {
		return val.indexOf(this.value) !== -1;
	}

	@HostListener('click')
	public click(): void {
		this.select.value$
			.pipe(take(1))
			.subscribe(val => {
				if (this.select.mode === Mode.Single) {
					this.select.value$.next([ this.value ]);
				} else {
					if (!this.has(val) && !this.checked) {
						this.select.value$.next([ ...val, this.value ]);
					} else if (this.checked) {
						this.select.value$.next(val.filter(value => value !== this.value));
					}
				}
			});
	}
}
