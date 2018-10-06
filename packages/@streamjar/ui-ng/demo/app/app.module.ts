import { SectionDemoComponent } from './components/section/section.demo';
import { PopupDemoComponent } from './components/popup/popup.demo';
import { PlatformsDemoComponent } from './components/platforms/platforms.demo';
import { ColourModule } from './../../src/lib/colour/index';
import { SectionModule } from './../../src/lib/section/index';
import { PopupModule } from './../../src/lib/popup/index';
import { CardModule } from './../../src/lib/card/index';
import { PlatformsModule } from './../../src/lib/platforms/index';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule, ButtonModule, CheckboxModule, DialogModule, FilterModule, IconModule, InputModule, MenuModule, RadioModule, SelectModule, SliderModule, SpinnerModule, TabsModule, ToastModule, TooltipModule, PatternModule } from 'index';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';
import { AvatarDemoComponent } from './components/avatar/avatar.demo';
import { ButtonDemoComponent } from './components/button/button.demo';
import { CardDemoComponent } from './components/card/card.demo';
import { CheckboxDemoComponent } from './components/checkbox/checkbox.demo';
import { DialogDemoComponent, NormalComponent, StatefulComponent } from './components/dialog/dialog.demo';
import { FilterDemoComponent } from './components/filter/filter.demo';
import { IconsDemoComponent } from './components/icons/icons.demo';
import { InputsDemoComponent } from './components/inputs/inputs.demo';
import { MenuDemoComponent } from './components/menu/menu.demo';
import { PatternDemoComponent } from './components/pattern/pattern.demo';
import { RadioDemoComponent } from './components/radio/radio.demo';
import { SelectDemoComponent } from './components/select/select.demo';
import { SliderDemoComponent } from './components/slider/slider.demo';
import { SpinnerDemoComponent } from './components/spinner/spinner.demo';
import { TabsDemoComponent } from './components/tabs/tabs.demo';
import { ToastsDemoComponent } from './components/toasts/toasts.demo';
import { TooltipDemoComponent } from './components/tooltip/tooltip.demo';
import { DemoComponent } from './demo/demo.component';
import { DemoTableComponent } from './table/table.component';
import { ColourDemoComponent } from './components/colour/colour.demo';

@NgModule({
	bootstrap: [AppComponent],
	entryComponents: [
		StatefulComponent,
		NormalComponent,
	],
	declarations: [
		AppComponent,
		DemoComponent,
		DemoTableComponent,
		StatefulComponent,
		NormalComponent,

		AvatarDemoComponent,
		ButtonDemoComponent,
		CardDemoComponent,
		CheckboxDemoComponent,
		DialogDemoComponent,
		FilterDemoComponent,
		IconsDemoComponent,
		InputsDemoComponent,
		MenuDemoComponent,
		RadioDemoComponent,
		SelectDemoComponent,
		SliderDemoComponent,
		SpinnerDemoComponent,
		TabsDemoComponent,
		TooltipDemoComponent,
		ToastsDemoComponent,
		PatternDemoComponent,
		PlatformsDemoComponent,
		PopupDemoComponent,
		SectionDemoComponent,
		ColourDemoComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FlexLayoutModule,
		MonacoEditorModule.forRoot(),
		FormsModule,
		HttpClientModule,

		AvatarModule,
		ButtonModule,
		CheckboxModule,
		FilterModule,
		InputModule,
		IconModule,
		MenuModule,
		RadioModule,
		SelectModule,
		SliderModule,
		SpinnerModule,
		TabsModule,
		CardModule,
		PlatformsModule,
		PopupModule,
		SectionModule,
		PatternModule,
		TooltipModule.forRoot(),
		DialogModule.forRoot(),
		ToastModule.forRoot(),
		InputModule.forRoot(),
		ColourModule.forRoot(),
		RouterModule.forRoot([
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/avatar',
			},
			{
				path: 'avatar',
				component: AvatarDemoComponent,
			},
			{
				path: 'button',
				component: ButtonDemoComponent,
			},
			{
				path: 'card',
				component: CardDemoComponent,
			},
			{
				path: 'checkbox',
				component: CheckboxDemoComponent,
			},
			{
				path: 'colour',
				component: ColourDemoComponent,
			},
			{
				path: 'dialog',
				component: DialogDemoComponent,
			},
			{
				path: 'filter',
				component: FilterDemoComponent,
			},
			{
				path: 'icons',
				component: IconsDemoComponent,
			},
			{
				path: 'inputs',
				component: InputsDemoComponent,
			},
			{
				path: 'pattern',
				component: PatternDemoComponent,
			},
			{
				path: 'platforms',
				component: PlatformsDemoComponent,
			},
			{
				path: 'popup',
				component: PopupDemoComponent,
			},
			{
				path: 'menu',
				component: MenuDemoComponent,
			},
			{
				path: 'radio',
				component: RadioDemoComponent,
			},
			{
				path: 'section',
				component: SectionDemoComponent,
			},
			{
				path: 'select',
				component: SelectDemoComponent,
			},
			{
				path: 'slider',
				component: SliderDemoComponent,
			},
			{
				path: 'spinner',
				component: SpinnerDemoComponent,
			},
			{
				path: 'tabs',
				component: TabsDemoComponent,
			},
			{
				path: 'toasts',
				component: ToastsDemoComponent,
			},
			{
				path: 'tooltip',
				component: TooltipDemoComponent,
			},
		]),
	],
	providers: [],
})
export class AppModule { }
