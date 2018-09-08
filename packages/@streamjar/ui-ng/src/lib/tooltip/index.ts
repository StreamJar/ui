import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipService } from './tooltip.service';

@NgModule({
	declarations: [
		TooltipDirective,
		TooltipComponent,
	],
	entryComponents: [
		TooltipComponent,
	],
	exports: [
		TooltipDirective,
	],
	imports: [
		CommonModule,
	],
	providers: [
		TooltipService,
	],
})
export class TooltipModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: TooltipModule,
			providers: [JarDialogOutlet2Service, TooltipService],
		}
	}
}
