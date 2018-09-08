import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RippleModule } from '../ripple';
import { JarCheckboxComponent } from './checkbox.component';

@NgModule({
	declarations: [
		JarCheckboxComponent,
	],
	exports: [
		JarCheckboxComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RippleModule,
	],
})
export class CheckboxModule {

}
