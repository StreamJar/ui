import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineSVGModule } from 'ng-inline-svg';

import { JarIconComponent } from './icon.component';

@NgModule({
	declarations: [
		JarIconComponent,
	],
	exports: [
		JarIconComponent,
	],
	imports: [
		CommonModule,
		InlineSVGModule.forRoot(),
		FlexLayoutModule,
	],
})
export class IconModule {

}
