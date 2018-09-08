import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { JarSliderComponent } from './slider.component';

@NgModule({
	declarations: [
		JarSliderComponent,
	],
	exports: [
		JarSliderComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
})
export class SliderModule {

}
