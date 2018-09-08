import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TooltipRefService {
	public value = new BehaviorSubject('');
	public position = new BehaviorSubject('top');
	public element = new BehaviorSubject(null);

	private alive = true;

	public readonly onClose = new Subject();
	public readonly onClosed = new Subject();

	public isAlive(): boolean {
		return this.alive;
	}

	public destroy(): void {
		this.alive = false;
		this.onClose.next(null);
	}
}
