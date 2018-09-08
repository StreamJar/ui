/**
 * DISCLAIMER: This is ported over from Angular Material 2.
 * Did you really think I'd write my own ripples? 💩
 */
import { NgModule } from '@angular/core';
import { MdRipple } from './ripple';
import { ViewportRuler } from './ruler';

@NgModule({
	declarations: [
		MdRipple,
	],
	exports: [
		MdRipple,
	],
	providers: [ ViewportRuler ],
})
export class RippleModule {

}
