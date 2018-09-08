import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DialogRefService {
	public readonly onClose: Subject<any> = new Subject();
	public readonly onClosed = new Subject();

	public close(data?: any) {
		this.onClose.next(data);
	}
}
