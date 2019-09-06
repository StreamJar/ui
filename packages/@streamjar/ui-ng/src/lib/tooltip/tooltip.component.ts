import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { TooltipRefService } from './tooltipRef.service';

const ANIMATION_DURATION = 300;
const EL_OFFSET = 5;

@Component({
	animations: [
		trigger('dialogAnimation', [
			state('void', style({ transform: 'translateY(25%) scale(1)', opacity: 0 })),
			state('enter', style({ transform: 'translateY(0%) scale(1)', opacity: 1 })),
			state('exit', style({ transform: 'translateY(50%) scale(1)', opacity: 0 })),
			transition('* => *', animate(`${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`)),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-tooltip',
	templateUrl: './tooltip.component.html',
})
export class TooltipComponent implements OnDestroy {
	public topPos$ = new BehaviorSubject<number>(0);
	public leftPos$ = new BehaviorSubject<number>(0);
	public opacity$ = new BehaviorSubject(0);
	public state$ = new BehaviorSubject<string>('enter');


	public subscriptions: Subscription[] = [];

	@ViewChild('el', { static: true })
	public el;

	constructor(public ref: TooltipRefService) {
		setTimeout(() => this.sync());

		this.subscriptions.push(ref.onClose.subscribe(() => {
			this.state$.next('exit');
			setTimeout(() => {
				ref.onClosed.next(null);
				ref.onClosed.complete();
			}, ANIMATION_DURATION);
		}));
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	public onresize(): void {
		this.sync();
	}

	@HostListener('window:resize')
	@HostListener('window:scroll')
	public sync(): void {
		const ne = this.ref.element.getValue()

		const centerPositionX = ne.getBoundingClientRect().left + (ne.offsetWidth / 2);
		const centerPositionY = ne.getBoundingClientRect().top + (ne.offsetHeight / 2);

		if (this.ref.position.getValue() === 'top') {
			this.topPos$.next(ne.getBoundingClientRect().top - this.el.nativeElement.offsetHeight - EL_OFFSET);
			this.leftPos$.next(centerPositionX - (this.el.nativeElement.offsetWidth / 2));
		} else if (this.ref.position.getValue() === 'bottom') {
			this.topPos$.next(ne.getBoundingClientRect().top + ne.offsetHeight + EL_OFFSET);
			this.leftPos$.next(centerPositionX - (this.el.nativeElement.offsetWidth / 2));
		} else if (this.ref.position.getValue() === 'right') {
			this.leftPos$.next(ne.getBoundingClientRect().left + ne.getBoundingClientRect().width + EL_OFFSET);
			this.topPos$.next(centerPositionY - (this.el.nativeElement.offsetHeight / 2));
		} else if (this.ref.position.getValue() === 'left') {
			this.leftPos$.next(ne.getBoundingClientRect().left - this.el.nativeElement.offsetWidth - EL_OFFSET);
			this.topPos$.next(centerPositionY - (this.el.nativeElement.offsetHeight / 2));
		}

		setTimeout(() => {
			this.opacity$.next(1);
		});
	}
}
