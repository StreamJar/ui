import { BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'jar-icon',
	template: `
		<i class="material-icons" *ngIf="((family$ | async) === 'material'); else jar">{{icon$ | async}}</i>
		<ng-template #jar><div class="jar-icons" [inlineSVG]="'/assets/icons/' + (icon$ | async) + '.svg'"></div></ng-template>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JarIconComponent {
	public icon$ = new BehaviorSubject('');
	public family$ = new BehaviorSubject('material');

	@Input()
	set icon(icon: string) {
		this.family$.next(icon.startsWith('jar_') ? 'jar': 'material');
		this.icon$.next(icon.replace(/^jar_/, ''));
	}
}
