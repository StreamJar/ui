import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AvatarModule } from './lib/avatar';
import { ButtonModule } from './lib/button';
import { CheckboxModule } from './lib/checkbox';
import { DialogModule } from './lib/dialog';
import { FilterModule } from './lib/filter';
import { IconModule } from './lib/icon';
import { InputModule } from './lib/input';
import { MenuModule } from './lib/menu';
import { PatternModule } from './lib/pattern';
import { RadioModule } from './lib/radio';
import { SelectModule } from './lib/select';
import { SliderModule } from './lib/slider';
import { SpinnerModule } from './lib/spinner';
import { TabsModule } from './lib/tabs';
import { ToastModule } from './lib/toasts';
import { TooltipModule } from './lib/tooltip';
import { PlatformsModule } from './lib/platforms';
import { PopupModule } from './lib/popup';
import { CardModule } from './lib/card';
import { SectionModule } from './lib/section';

const modules = [
	ButtonModule,
	InputModule,
	IconModule,
	DialogModule,
	TabsModule,
	AvatarModule,
	CheckboxModule,
	MenuModule,
	RadioModule,
	SelectModule,
	SpinnerModule,
	SpinnerModule,
	TooltipModule,
	ToastModule,
	SliderModule,
	FilterModule,
	PatternModule,
	SectionModule,
	CardModule,
	PopupModule,
	PlatformsModule,
];

@NgModule({
	exports: modules,
	imports: [ ...modules, FlexLayoutModule ],
})
export class UiModule {

}
