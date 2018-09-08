import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CheckboxModule } from '../checkbox';
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
