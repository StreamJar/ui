import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { RippleModule } from '../ripple';
import { JarMenuComponent } from './menu.component';
import { JarMenuTriggerDirective } from './trigger.directive';

@NgModule({
	declarations: [
		JarMenuComponent,
		JarMenuTriggerDirective,
	],
	exports: [
		JarMenuComponent,
		JarMenuTriggerDirective,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RippleModule,
	],
})
export class MenuModule {
	public static forRoot(): ModuleWithProviders{
		return {
			ngModule: MenuModule,
			providers: [JarDialogOutlet2Service],
		}
	}
}
