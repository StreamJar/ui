import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RippleModule } from '../ripple';
import { JarRadioComponent } from './radio.component';
import { JarRadioGroupDirective } from './radiogroup.directive';

@NgModule({
	declarations: [
		JarRadioComponent,
		JarRadioGroupDirective,
	],
	exports: [
		JarRadioComponent,
		JarRadioGroupDirective,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RippleModule,
	],
})
export class RadioModule {

}
