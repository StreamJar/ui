import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../button';
import { CheckboxModule } from '../checkbox';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { MenuModule } from '../menu';
import { RippleModule } from '../ripple';
import { JarSelectComponent } from './select.component';
import { JarSelectItemComponent } from './selectItem.component';

@NgModule({
	declarations: [
		JarSelectComponent,
		JarSelectItemComponent,
	],
	exports: [
		JarSelectComponent,
		JarSelectItemComponent,
	],
	imports: [
		FlexLayoutModule,
		FormsModule,
		ButtonModule,
		IconModule,
		CheckboxModule,
		CommonModule,
		RippleModule,
		MenuModule,
		InputModule,
	],
})
export class SelectModule {

}
