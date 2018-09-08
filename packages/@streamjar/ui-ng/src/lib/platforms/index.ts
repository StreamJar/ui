import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'index';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PlatformsComponent } from './platforms.component';

@NgModule({
	declarations: [
		PlatformsComponent,
	],
	exports: [
		PlatformsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		CheckboxModule,
		FlexLayoutModule,
	]
})
export class PlatformsModule {

}
