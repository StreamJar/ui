import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from '../button';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { JarDialogOutlet2Service } from '../outlet2/outlet.service';

export { ToastService } from './toast.service';

@NgModule({
	declarations: [
		ToastComponent,
	],
	entryComponents: [
		ToastComponent,
	],
	imports: [
		CommonModule,
		ButtonModule,
		FlexLayoutModule,
	],
})
export class ToastModule {
	public static forRoot(): ModuleWithProviders  {
		return {
			ngModule: ToastModule,
			providers: [ToastService, JarDialogOutlet2Service],
		}
	}
}
