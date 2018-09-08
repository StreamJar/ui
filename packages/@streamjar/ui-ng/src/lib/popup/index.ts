import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PopupComponent } from './popup.component';

@NgModule({
	declarations: [
		PopupComponent,
	],
	exports: [
		PopupComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
	]
})
export class PopupModule {

}
