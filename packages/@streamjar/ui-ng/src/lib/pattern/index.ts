import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PatternComponent } from './pattern.component';

@NgModule({
	declarations: [
		PatternComponent,
	],
	exports: [
		PatternComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
	],
})
export class PatternModule {

}
