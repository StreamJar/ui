import {
	forwardRef,
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	Output,
	QueryList,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Input,
} from '@angular/core';

import { JarTabComponent } from './tab.component';

const TAB_OFFSET = 3;

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-tabs',
	template: '<div class="jar-tabs"><ng-content></ng-content>' +
		'<div class="jar-tabs__position" *ngIf="location"' +
			'[style.margin-left]="location.left"' +
			'[style.top]="location.top"' +
			'[style.width]="location.width"></div></div>',
})
export class JarTabsComponent implements AfterContentInit {
	@ContentChildren(forwardRef(() => JarTabComponent))
	public tabs: QueryList<JarTabComponent>;

	@Output()
	public selected = new EventEmitter();

	public location: { left: string; width: string, top: string } = null;
	private current: JarTabComponent;

	@Input('current')
	set _current(val: string) {
		setTimeout(() => {
			const current = this.tabs.find(i => i.value === val);

			if (current) {
				this.current = current;
				this.redraw(this.current);
			}
		});

	}

	constructor(private cd: ChangeDetectorRef) {}

	public ngAfterContentInit(): void {
		if (!this.current) {
			this.current = this.tabs.first;
		}

		this.redraw(this.current);
	}

	public redraw(current: JarTabComponent): void {
		setTimeout(() => {
			this.location = {
				left: `${current.getLeft()}px`,
				top: `${current.getTop() - TAB_OFFSET}px`,
				width: `${current.getWidth()}px`,
			};

			this.cd.detectChanges();
		});
	}

	public next(component: JarTabComponent): void {
		this.current = component;
		this.selected.emit(this.current.value)

		this.redraw(this.current);
	}
}
