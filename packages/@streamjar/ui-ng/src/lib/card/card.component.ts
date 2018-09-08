import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-card',
	templateUrl: './card.component.html',
})
export class CardComponent {
	@Input()
	public icon: string;
}
