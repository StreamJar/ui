import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JarDialogService } from '../dialog';
import { ColourDialogComponent } from './colours.dialog';

@Injectable()
export class ColourService {
	constructor(private dialog: JarDialogService) {}

	public pick(colour?: string): Observable<string> {
		console.log(colour);
		return this.dialog.show(ColourDialogComponent, { colour })
			.pipe(switchMap(out => out.onClose));
	}
}
