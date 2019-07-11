import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../toasts';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-theme-toggle',
	templateUrl: './theme-toggle.component.html',
})
export class JarThemeToggleComponent {
	public isLight$: BehaviorSubject<boolean> = new BehaviorSubject(false);


	constructor(private toast: ToastService) {

	}

	public ngOnInit(): void {
		const body = document.getElementsByTagName('html')[0];

		if (body) {
			if (body.className.includes('j-light')) {
				this.isLight$.next(true);
			} else {
				if (localStorage.getItem('@streamjar/ui.theme') === 'light') {
					this.toggle(true);
				}
			}
		}
	}

	public toggle(supress = false): void {
		const body = document.getElementsByTagName('html')[0];

		if (body) {
			if (body.className.includes('j-dark')) {
				body.setAttribute('class', body.className.replace('j-dark', 'j-light'));
				this.isLight$.next(true);
				localStorage.setItem('@streamjar/ui.theme', 'light')

				if (!supress) {
					this.toast.info(`It's bright in here.`);
				}
			} else if (body.className.includes('j-light')) {
				body.setAttribute('class', body.className.replace('j-light', 'j-dark'));
				this.isLight$.next(false);
				localStorage.setItem('@streamjar/ui.theme', 'dark')

				if (!supress) {
					this.toast.info(`Spooky. It's dark!`);
				}
			} else {
				body.setAttribute('class', `j-light ${body.className}`);
				this.isLight$.next(true);

				if (!supress) {
					this.toast.info(`Welcome to the dar- .. bright side?`);
				}

				localStorage.setItem('@streamjar/ui.theme', 'light')
			}
		}
	}
}
