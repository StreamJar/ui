import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SectionComponent } from './section.component';

@NgModule({
	declarations: [
		SectionComponent,
	],
	exports: [
		SectionComponent,
	],
	imports: [
		FlexLayoutModule,
	]
})
export class SectionModule {

}
