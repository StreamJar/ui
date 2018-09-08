import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-popup',
	templateUrl: './popup.component.html',
})
export class PopupComponent {
	@Input()
	public title = '';

	@Input()
	public tag: string;
}
