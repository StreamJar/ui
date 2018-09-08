import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { IconModule } from '../icon';
import { RippleModule } from '../ripple';

import { JarButtonComponent } from './button.component';

@NgModule({
	declarations: [
		JarButtonComponent,
	],
	exports: [
		JarButtonComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		IconModule,
		RippleModule,
	],
})
export class ButtonModule {

}
