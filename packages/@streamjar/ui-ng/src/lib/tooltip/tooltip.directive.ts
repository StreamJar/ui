import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';

import { TooltipService } from './tooltip.service';
import { TooltipRefService } from './tooltipRef.service';

export type position = 'top' | 'bottom' | 'left' | 'right';

/* tslint:disable no-input-rename */
@Directive({
	selector: '[jarTooltip]',
})
export class TooltipDirective implements OnDestroy {
	@Input('jarTooltip')
	public tooltip: string;

	@Input('jarTooltipPos')
	public position: position = 'top';

	private self: TooltipRefService;

	constructor(private viewContainerRef: ViewContainerRef, private tooltipService: TooltipService, private host: ElementRef) {
	}

	@HostListener('mouseenter')
	public show(): void {
		this.self = this.tooltipService.createTooltip(this.tooltip, this.position, this.host, this.viewContainerRef);
	}

	@HostListener('mouseleave')
	public ngOnDestroy(): void {
		if (this.self && this.self.isAlive()) {
			this.self.destroy();
		}
	}
}
