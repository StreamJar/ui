import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from '../tooltip';
import { IconModule } from '../icon';
import { JarTextareaAutosizeDirective } from './autosize.directive';
import { ErrorMessageService } from './error-message.service';
import { JarFileInputComponent } from './file.component';
import { JarInputComponent, JarInputPrefixComponent, JarInputSuffixComponent } from './input.component';
import { JarLabelComponent } from './label.component';
import { JarTextareaComponent } from './textarea.component';

@NgModule({
	declarations: [
		JarInputComponent,
		JarLabelComponent,
		JarTextareaComponent,
		JarFileInputComponent,
		JarInputPrefixComponent,
		JarInputSuffixComponent,
		JarTextareaAutosizeDirective,
	],
	exports: [
		JarInputComponent,
		JarLabelComponent,
		JarTextareaComponent,
		JarInputPrefixComponent,
		JarInputSuffixComponent,
		JarTextareaAutosizeDirective,
		JarFileInputComponent,
	],
	imports: [
		FlexLayoutModule,
		FormsModule,
		CommonModule,
		IconModule,
		TooltipModule,
	],
	providers: [
		ErrorMessageService,
	],
})
export class InputModule {
	public static forRoot(): ModuleWithProviders  {
		return {
			ngModule: InputModule,
			providers: [ErrorMessageService],
		}
	}
}
