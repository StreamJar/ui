import {
	Directive,
	ElementRef,
	EmbeddedViewRef,
	HostListener,
	Input,
	OnDestroy,
	ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { JarMenuComponent } from './menu.component';

const STATIC_WIDTH = 165;
const WINDOW_OFFSET = 15;

@Directive({
	selector: '[jarMenuTrigger]',
})
export class JarMenuTriggerDirective implements OnDestroy {
	@Input()
	public jarMenuTrigger?: JarMenuComponent;

	@Input()
	public parentWidth = false;


	@Input()
	public shouldDestroyFn: (event: MouseEvent) => boolean = () => true;

	@Input()
	set toggleStatus(val: boolean) {
		if (!val && !this.menuRef) {
			return;
		}

		this.click(null);
	}

	private menuRef: EmbeddedViewRef<any> = null;
	private context = {
		left$: new BehaviorSubject<number>(0),
		top$: new BehaviorSubject<number>(null),
		bottom$: new BehaviorSubject<number>(null),
		width$: new BehaviorSubject<number>(0),
		maxHeight$: new BehaviorSubject<number>(null),
	};

	constructor(
		private elementRef: ElementRef,
		private viewContainerRef: ViewContainerRef,
		private outletService: JarDialogOutlet2Service,
	) {
		document.addEventListener('click', this.handleClick.bind(this));
	}

	public ngOnDestroy() {
		document.removeEventListener('click', this.handleClick.bind(this));
	}

	/**
	 * Handle clicks outside the target.
	 * If the user clicks outside the target, destroy the menu.
	 *
	 * @param event Click Event.
	 */
	private handleClick(event): void {
		if (this.menuRef && !this.elementRef.nativeElement.contains(event.target) && this.shouldDestroyFn(event)) {
			this.menuRef.destroy();
			this.menuRef = null;
		}
	}

	/**
	 * Calculate the left position of the menu.
	 * Depending on whether we're scaling or listening to the parent, adjust the width
	 * and then center the menu.
	 */
	private calcCenterWidth(): number {
		let width: number = STATIC_WIDTH;


		if (this.jarMenuTrigger.width) {
			width = +this.jarMenuTrigger.width;
		}

		if (this.parentWidth) {
			width = this.elementRef.nativeElement.offsetWidth;
		}

		const windowWidth = document.documentElement.clientWidth;
		const middleBtn = this.elementRef.nativeElement.getBoundingClientRect().left + (this.elementRef.nativeElement.offsetWidth / 2);

		const pos = middleBtn - (width / 2);

		let offset = pos;

		if (width >= windowWidth) {
			width = windowWidth;
			offset = 0;
		} else if ((pos + width) >= windowWidth) {
			offset = windowWidth - WINDOW_OFFSET - width;
		} else if (pos < 0) {
			offset = WINDOW_OFFSET;
		}

		this.context.width$.next(width);

		return offset;
	}

	/**
	 * Reposition the menu.
	 * Set the top/left positions of the menu based on the click target.
	 */
	private repositionElement(): void {
		const elTop = this.elementRef.nativeElement.getBoundingClientRect().top + this.elementRef.nativeElement.offsetHeight;
		const areaAboveElement = this.elementRef.nativeElement.getBoundingClientRect().top;
		const areaBelowElement = window.innerHeight - elTop;

		// Prefer the top
		if (areaAboveElement > areaBelowElement) {
			this.context.top$.next(null);
			this.context.bottom$.next(window.innerHeight - areaAboveElement);
			this.context.maxHeight$.next(areaAboveElement - WINDOW_OFFSET);
		} else { // Prefer the bottom
			this.context.top$.next(elTop);
			this.context.bottom$.next(null);

			this.context.maxHeight$.next(window.innerHeight - elTop - WINDOW_OFFSET);
		}

		this.context.left$.next(this.calcCenterWidth());
	}

	/**
	 * Display or hide the menu on click.
	 * If the menu doesn't exist, create a new menu.
	 *
	 * @param e Click event.
	 */
	@HostListener('click', ['$event'])
	public click(e): void {
		if (!this.menuRef) {
			this.menuRef = this.outletService.createFromTemplate(this.jarMenuTrigger.templateRef, this.viewContainerRef, this.context);
			this.repositionElement();

			return;
		}

		if (this.shouldDestroyFn(e)) {
			this.menuRef.destroy();
			this.menuRef = null;
		}
	}

	/**
	 * Handle the browser resize event.
	 * Reposition the element when the browser gets resized.
	 */
	@HostListener('window:resize')
	@HostListener('window:scroll')
	public resize(): void {
		if (!this.menuRef) {
			return;
		}

		this.repositionElement();
	}
}
