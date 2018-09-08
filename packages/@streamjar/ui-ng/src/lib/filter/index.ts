import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonModule } from '../button';
import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { JarFilterSectionComponent } from './filter-section.component';
import { JarFilterComponent } from './filter.component';

@NgModule({
	declarations: [
		JarFilterComponent,
		JarFilterSectionComponent,
	],
	exports: [
		JarFilterComponent,
		JarFilterSectionComponent,
	],
	imports: [
		CommonModule,
		ButtonModule,
		FlexLayoutModule,
	],
})
export class FilterModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FilterModule,
			providers: [JarDialogOutlet2Service],
		}
	}
}
