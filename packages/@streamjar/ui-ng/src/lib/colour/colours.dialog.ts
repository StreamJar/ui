import { Component, Inject} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { DialogRefService, DIALOG_ATTRS } from '../dialog';

import * as chromaJ from 'chroma-js';

const chroma = chromaJ;
const HSV_MULT = 360;

@Component({
	selector: 'jar-colours-dialog',
	styleUrls: ['./colours.dialog.scss'],
	templateUrl: './colours.dialog.html',
})
export class ColourDialogComponent {
	public hue = 0;
	public opacity = 1;
	public s = 1;
	public v = 1;

	public rgbColour = 'rgb(255, 0, 0)';
	public rgbaColour = 'rgba(255, 0, 0, 1)';
	public hueColour = 'rgb(255, 0, 0)';

	constructor(
		private dialog: DialogRefService,
		private sanitizer: DomSanitizer,
		@Inject(DIALOG_ATTRS) public data: any,
	) {
		if (data.colour) {
			this.parseColour(data.colour);
		}
	}

	public close(save: boolean = false): void {
		this.dialog.close(save ? this.rgbaColour : this.data.colour);
	}

	public setHue(val): void {
		this.hue = val.v;

		this.sync();
	}

	public setOpacity(val): void {
		this.opacity = val.v;

		this.sync();
	}

	public setData(data): void {
		this.s = data.s;
		this.v = data.v;

		this.sync();
	}

	public sync(): void {
		this.rgbColour = chroma(this.hue * HSV_MULT, this.s, this.v, 'hsv').css('rgb');
		this.rgbaColour = chroma(this.rgbColour).alpha(this.opacity).css('rgba');
		this.hueColour = chroma(this.hue * HSV_MULT, 1, 1, 'hsv').css('rgb');
	}

	public toGradient(): SafeStyle {
		return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to bottom, rgba(0,0,0,0), ${this.rgbColour})`);
	}

	public userChange(e): void {
		const input = e.target.value;

		this.parseColour(input);
	}

	public parseColour(input: string): void {
		try {
			const opacity = chroma(input).alpha();
			const hsv = chroma(input).hsv();

			this.opacity = opacity;
			this.hue = (hsv[0] || 0)  / HSV_MULT;
			this.s = hsv[1];
			this.v = hsv[2];
		} catch (e) {
		}

		this.sync();
	}
}
