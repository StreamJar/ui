import { Component, ElementRef, Host, HostListener, Input, ChangeDetectionStrategy } from '@angular/core';

import { JarTabsComponent } from './tabs.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-tab',
	styles: [`:host { display: inline-block; height: 35px; }`],
	template: '<div class="jar-tab"><ng-content></ng-content> <div md-ripple [mdRippleTrigger]="_getHostElement()"></div></div>',
})
export class JarTabComponent {

	@Input()
	public value = '';

	constructor(@Host() private tabs: JarTabsComponent, private _elementRef: ElementRef) {}

	public getLeft(): number {
		return this._elementRef.nativeElement.offsetLeft;
	}

	public getWidth(): number {
		return this._elementRef.nativeElement.offsetWidth;
	}

	public getTop(): number {
		return this._elementRef.nativeElement.offsetTop + this._elementRef.nativeElement.offsetHeight;
	}

	public _getHostElement(): HTMLElement {
		return this._elementRef.nativeElement;
	}

	@HostListener('click')
	public click(): void {
		this.tabs.next(this);
	}
}
