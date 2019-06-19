import {
	animate,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	TemplateRef,
	ViewChild,
} from '@angular/core';

@Component({
	animations: [
		trigger('menu', [
			transition(':enter', [
				style( { opacity: 0, marginTop: '-30px'}),
				animate('200ms ease-in-out', style({opacity: 1, marginTop: '0'})),
			]),
			transition(':leave', [
				style( { opacity: 1, marginTop: '0px' }),
				animate('200ms ease-out', style({opacity: 0, marginTop: '-30px'})),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-menu',
	templateUrl: './menu.component.html',
})
export class JarMenuComponent {
	@ViewChild('templateRef', { static: true })
	public templateRef: TemplateRef<any>;

	@Input()
	public multiplier = '1';

	@Input()
	public width = null;
}
