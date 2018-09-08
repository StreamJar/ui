import { CommonModule } from '@angular/common';
import {
	ModuleWithProviders,
	NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from '../button';
import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { SpinnerModule } from '../spinner';
import {
	JarDialogActionsComponent,
	JarDialogComponent,
	JarDialogContentComponent,
	JarDialogHeaderComponent,
	JarDialogLoadableComponent,
} from './dialog.component';
import { JarDialogService } from './dialog.service';
import { DialogRefService } from './dialogRef.service';

@NgModule({
	declarations: [
		JarDialogComponent,
		JarDialogLoadableComponent,
		JarDialogHeaderComponent,
		JarDialogContentComponent,
		JarDialogActionsComponent,
	],
	exports: [
		JarDialogComponent,
		JarDialogLoadableComponent,
		JarDialogHeaderComponent,
		JarDialogContentComponent,
		JarDialogActionsComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		ButtonModule,
		SpinnerModule,
	],
	providers: [
		DialogRefService,
		JarDialogService,
	],
})
export class DialogModule {
	public static forRoot(): ModuleWithProviders{
		return {
			ngModule: DialogModule,
			providers: [ JarDialogService, JarDialogOutlet2Service ],
		}
	}
}

export { DialogRefService } from './dialogRef.service';
export { DIALOG_ATTRS } from './dialog.service';
export { JarDialogService } from './dialog.service';
export { JarDialogLoadableComponent } from './dialog.component';
