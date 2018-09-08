import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const SVG_WIDTH = 1440;
const SVG_HEIGHT = 900;
const MULT = 1.77;

declare var TimelineMax: any;
declare var Elastic: any;

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-pattern',
	styleUrls: [ './pattern.component.scss'],
	templateUrl: './pattern.component.html',
})
export class PatternComponent implements OnInit {
	@ViewChild('svg')
	private svg;

	private tlConfig = {
		delay: 0,
		ease: 'ease-in',
		onReverseComplete: () => {
			this.hidden.next(),
			this.hide$.next(true);
			this.cd.detectChanges();
		},
		repeat: 0,
		repeatDelay: .25,
		yoyo: true,
	}

	private tl;

	public width$ = new BehaviorSubject<number>(0);
	public height$ = new BehaviorSubject<number>(0);

	@Input()
	public repeat = false;

	@Output()
	public hidden = new EventEmitter();

	public hide$ = new BehaviorSubject<boolean>(false);

	constructor(private el: ElementRef, private cd: ChangeDetectorRef) {
	}

	public ngOnInit() {
		this.onResize();

		this.tlConfig.repeat = this.repeat ? -1 : 0;
		this.tlConfig.yoyo = this.repeat;

		this.tl = new TimelineMax(this.tlConfig);

		const elements = Array.from((<any>this.svg.nativeElement.querySelectorAll('path')).values());

		const from = {
			css: {
				opacity: 0,
				scale: 1,
				transformOrigin: 'center center',
			},
			ease: Elastic.easeIn,
		};

		const to = {
			css: {
				opacity: 1,
				scale: 1,
			},
			ease: Elastic.easeOut,
		};

		const DURATION = 1.5;
		const STEP_TIME = .002;

		this.tl.staggerFromTo(elements, DURATION, from, to, STEP_TIME, 0);
	}

	@HostListener('window:resize')
	public onResize() {
		this.height$.next(Math.max(this.el.nativeElement.clientWidth / MULT, SVG_HEIGHT));
		this.width$.next(Math.max(this.el.nativeElement.clientHeight * MULT, SVG_WIDTH));
	}

	public hide() {
		this.tl.stop();
		this.tl.reverse();
	}
}
