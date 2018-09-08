import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '../ripple';
import { JarTabComponent } from './tab.component';
import { JarTabsComponent } from './tabs.component';

@NgModule({
	declarations: [
		JarTabsComponent,
		JarTabComponent,
	],
	exports: [
		JarTabComponent,
		JarTabsComponent,
	],
	imports: [
		CommonModule,
		RippleModule,
	],
	providers: [  ],
})
export class TabsModule {

}
