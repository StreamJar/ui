import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

const ANIMATION_DURATION = 500;

const ICONS = {
	'error': 'warning',
	'info': 'info_outline',
	'success': 'done_all',
};

const THEMES = {
	error: 'danger',
	info: 'platform-smashcast',
	success: 'success',
}

@Component({
	animations: [
		trigger('toastAnimation', [
			state('void', style({ transform: 'translateY(25%) scale(0.5)', opacity: 0 })),
			state('enter', style({ transform: 'translateY(0%) scale(1)', opacity: 1 })),
			state('exit', style({ transform: 'translateY(25%) scale(0.5)', opacity: 0 })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-toast',
	templateUrl: './toast.component.html',
})
export class ToastComponent {
	private current;
	private to;
	private to1;

	public toast = null;
	public state = 'enter';
	public icon = 'star';
	public theme = 'primary';

	constructor(private cd: ChangeDetectorRef) {}

	public showToast(type: string, message: string, duration: number) {
		clearTimeout(this.to1);
		clearTimeout(this.to);

		this.toast = { type, message, duration };
		this.state = 'enter';
		this.icon = ICONS[type];
		this.theme = THEMES[type];

		this.cd.detectChanges();

		return new Promise(resolve => {
			this.cd.detectChanges();
			this.current = resolve;

			this.to = setTimeout(() => {
				this.close();
			}, duration + ANIMATION_DURATION);
		})
	}

	public enter() {
		this.icon = 'delete';
	}

	public leave() {
		this.icon = ICONS[this.toast.type];
	}

	public close() {
		this.state = 'exit';
		this.toast = null;
		this.cd.detectChanges();

		this.to1 = setTimeout(() => {
			this.cd.detectChanges();
			this.current();
		}, ANIMATION_DURATION);
	}
}
