import { NgModule } from '@angular/core';
import { ButtonModule } from '../button';
import { CommonModule } from '@angular/common';
import { JarThemeToggleComponent } from './theme-toggle.component';
import { IconModule } from '../icon';

@NgModule({
	declarations: [
		JarThemeToggleComponent
	],
	exports: [
		JarThemeToggleComponent
	],
	imports: [
		CommonModule,
		ButtonModule,
		IconModule,
	],
	providers: [  ],
})
export class ThemeToggleModule {

}
