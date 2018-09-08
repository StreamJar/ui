import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from '../button';
import { DialogModule } from '../dialog';
import { InputModule } from '../input';
import { ColourService } from './colour.service';
import { ColourDialogComponent } from './colours.dialog';
import { SliderDirective } from './slider.directive';

export { ColourService } from './colour.service';

@NgModule({
	declarations: [
		ColourDialogComponent,
		SliderDirective,
	],
	entryComponents: [
		ColourDialogComponent,
	],
	imports: [
		CommonModule,
		ButtonModule,
		FlexLayoutModule,
		InputModule,
		DialogModule,
	],
})
export class ColourModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: ColourModule,
			providers: [ColourService],
		}
	}
}
