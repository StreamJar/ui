import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-input-label',
	template: '<span class="jar-input-label"> <ng-content> </ng-content></span>',
})
export class JarLabelComponent {

}
