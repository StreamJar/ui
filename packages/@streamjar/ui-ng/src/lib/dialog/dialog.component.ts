import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	Component,
	Input,
	ViewEncapsulation,
	ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { DialogRefService } from './dialogRef.service';

const ANIMATION_DURATION = 400;

export enum LoadingState {
	LOADED,
	LOADING,
}

@Component({
	animations: [
		trigger('dialogAnimation', [
			state('void', style({ transform: 'translateY(25%) scale(0.9)' })),
			state('enter', style({ transform: 'translateY(0%) scale(1)' })),
			state('exit', style({ transform: 'translateY(25%)' })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),

		trigger('overlay', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('exit', style({ opacity: 0 })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-dialog',
	styles: [`:host { position: relative; z-index: 10000; }`],
	templateUrl: './dialog.component.html',
})
export class JarDialogComponent {
	public LoadingState = LoadingState;

	public loadingState$ = new BehaviorSubject<LoadingState>(LoadingState.LOADED);

	@Input()
	public height: string;

	@Input()
	public width: string;

	@Input()
	public maxWidth: string;

	@Input()
	public minWidth: string;

	public state = 'enter';

	constructor(private dialog: DialogRefService) {
		dialog.onClose.pipe(take(1)).subscribe((data) => {
			this.dismiss(null, data);
		});
	}

	public dismiss(event, data = null): void {
		if (!event || event.currentTarget === event.target) {
			this.state = 'exit';

			setTimeout(() => {
				this.dialog.onClosed.next(data);
				this.dialog.onClosed.complete();
			}, ANIMATION_DURATION);
		}
	}
}

@Component({
	animations: [
		trigger('dialogAnimation', [
			state('void', style({ transform: 'translateY(25%) scale(0.9)' })),
			state('enter', style({ transform: 'translateY(0%) scale(1)' })),
			state('exit', style({ transform: 'translateY(25%)' })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),

		trigger('overlay', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('exit', style({ opacity: 0 })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-dialog-loading',
	styles: [`:host { position: relative; z-index: 10000; }`],
	templateUrl: './dialog.component.html',
})
export class JarDialogLoadableComponent {
	public LoadingState = LoadingState;

	public loadingState$ = new BehaviorSubject<LoadingState>(LoadingState.LOADING);

	@Input()
	public height: string;

	@Input()
	public width: string;

	@Input()
	public maxWidth: string;

	@Input()
	public minWidth: string;

	public state = 'enter';

	constructor(private dialog: DialogRefService) {
		dialog.onClose.pipe(take(1)).subscribe((data) => {
			this.dismiss(null, data);
		});
	}

	public loaded(): void {
		this.loadingState$.next(LoadingState.LOADED);
	}

	public fetching(): void {
		this.loadingState$.next(LoadingState.LOADING);
	}

	public dismiss(event, data = null): void {
		if (!event || event.currentTarget === event.target) {
			this.state = 'exit';

			setTimeout(() => {
				this.dialog.onClosed.next(data);
				this.dialog.onClosed.complete();
			}, ANIMATION_DURATION);
		}
	}
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-dialog-header',
	styles: [':host { flex-shrink: 0; }'],
	template: '<h5 class="jar-dialog-header__title"><ng-content></ng-content></h5>' +
		'<span fxFlex></span>' +
		'<button type="button" jarBtn round icon="close" (click)="dialog.close()"></button>',
})
export class JarDialogHeaderComponent {
	constructor(public dialog: DialogRefService) {}

}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-dialog-content',
	styles: [':host { flex: 1; padding: 15px 25px 10px; overflow: auto; }'],
	template: '<div fxFlex><ng-content></ng-content></div>',
})
export class JarDialogContentComponent {
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-dialog-footer',
	styles: [':host { display: flex; flex-direction: row; align-items: flex-end; padding: 20px 25px; }'],
	template: '<ng-content></ng-content>',
})
export class JarDialogActionsComponent {

}
