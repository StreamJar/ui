import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AvatarModule } from '../avatar/index';
import { CardComponent } from './card.component';

@NgModule({
	declarations: [
		CardComponent,
	],
	exports: [
		CardComponent,
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		AvatarModule,
	]
})
export class CardModule {

}
