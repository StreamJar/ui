import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	ElementRef,
	EmbeddedViewRef,
	HostListener,
	OnDestroy,
	QueryList,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { JarFilterSectionComponent } from './filter-section.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-filter',
	templateUrl: './filter.component.html',
})
export class JarFilterComponent implements OnDestroy {
	private ref: EmbeddedViewRef<any>;

	@ViewChild('settings', { static: true })
	private template;

	@ViewChild('anchor', { read: ElementRef, static: true })
	private anchor: ElementRef;

	@ContentChildren(JarFilterSectionComponent)
	public children: QueryList<JarFilterSectionComponent>;

	constructor(private outletService: JarDialogOutlet2Service, private viewContainer: ViewContainerRef) {}

	public onClick(): void {
		if (this.ref) {
			this.destroy();

			return;
		}

		const x = document.documentElement.clientWidth -
			(this.anchor.nativeElement.getBoundingClientRect().x + this.anchor.nativeElement.clientWidth);
		const y = this.anchor.nativeElement.getBoundingClientRect().y + this.anchor.nativeElement.clientHeight;

		this.ref = this.outletService.createFromTemplate(this.template, this.viewContainer, { x, y });
	}

	@HostListener('window:scroll')
	@HostListener('window:resize')
	public onUpdate(): void {
		if (this.ref) {
			this.ref.context.x = document.documentElement.clientWidth -
				(this.anchor.nativeElement.getBoundingClientRect().x + this.anchor.nativeElement.clientWidth);
			this.ref.context.y = this.anchor.nativeElement.getBoundingClientRect().y + this.anchor.nativeElement.clientHeight;
		}
	}

	public destroy(): void {
		this.ref.destroy();
		this.ref = null;
	}

	public ngOnDestroy(): void {
		if (this.ref) {
			this.destroy();
		}
	}
}
