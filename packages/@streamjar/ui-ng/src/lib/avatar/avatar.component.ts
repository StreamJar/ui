import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GravatarService } from './gravatar.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-avatar',
	styles: [`:host { display: inline-flex; }`],
	template: '<img class="jar-avatar" [src]="url$ | async" [style.width]="size + \'px\'" [style.height]="size + \'px\'" />',
})
export class JarAvatarComponent {
	public url$ = new BehaviorSubject('/assets/noavatar.png');

	@Input()
	public size = 60;

	@Input()
	set data(data: string | { avatar?: string; email?: string; }) {
		if (!data || data === 'null') {
			return;
		}

		if (typeof data === 'object') {
			if (data.avatar) {
				this.url$.next(data.avatar);
			} else if (data.email) {
				this.url$.next(this.gravatar.parse(data.email));
			}
		} else {
			this.url$.next(data);
		}
	}

	constructor(private gravatar: GravatarService) { }
}
