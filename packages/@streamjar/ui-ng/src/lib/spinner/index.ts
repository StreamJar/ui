import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JarSpinnerComponent } from './spinner.component';

@NgModule({
	declarations: [
		JarSpinnerComponent,
	],
	exports: [
		JarSpinnerComponent,
	],
	imports: [
		CommonModule,
	],
})
export class SpinnerModule {

}
