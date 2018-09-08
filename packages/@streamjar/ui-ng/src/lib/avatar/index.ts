import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JarAvatarComponent } from './avatar.component';
import { GravatarService } from './gravatar.service';

@NgModule({
	declarations: [
		JarAvatarComponent,
	],
	exports: [
		JarAvatarComponent,
	],
	imports: [
		CommonModule,
	],
	providers: [
		GravatarService,
	],
})
export class AvatarModule {

}
