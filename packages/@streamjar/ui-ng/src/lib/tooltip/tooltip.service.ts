import {
	ElementRef,
	Injectable,
	Provider,
} from '@angular/core';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { TooltipComponent } from './tooltip.component';
import { TooltipRefService } from './tooltipRef.service';
import { take } from 'rxjs/operators';

@Injectable()
export class TooltipService {
	private currentTooltip: TooltipRefService;

	constructor(private outletService: JarDialogOutlet2Service) {}

	private spawnTooltip(data: {
		element: ElementRef;
		value: string;
		position: string;
		container: any,
	}): TooltipRefService {
		const providers: Provider[] = [
			TooltipRefService,
		];

		const compRef = this.outletService.createFromRef(TooltipComponent, providers);
		const dialog: TooltipRefService = compRef.injector.get(TooltipRefService);
		dialog.value.next(data.value);
		dialog.position.next(data.position);
		dialog.element.next(data.element.nativeElement);
		dialog.onClosed.pipe(take(1)).subscribe(() => compRef.destroy());

		return dialog;
	}

	public createTooltip(value: string, position: string, element: ElementRef, container): TooltipRefService {
		if (this.currentTooltip && this.currentTooltip.isAlive()) {
			this.currentTooltip.destroy();
		}

		return this.spawnTooltip({
			container,
			element,
			position,
			value,
		});
	}
}
