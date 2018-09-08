import {
	ComponentFactoryResolver,
	Injectable,
	InjectionToken,
	Provider,
	Type,
} from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { DialogRefService } from './dialogRef.service';

export const DIALOG_ATTRS: InjectionToken<object> = new InjectionToken<any>('jar dialog data');

@Injectable()
export class JarDialogService {
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private outletService: JarDialogOutlet2Service,
	) { }

	public show(component: Type<any>, data: any): Observable<DialogRefService> {
		const providers: Provider[] = [
			{ provide: DIALOG_ATTRS, useValue: data },
			DialogRefService,
		];

		const compRef = this.outletService.createFromRef(component, providers, this.componentFactoryResolver);
		const dialog: DialogRefService = compRef.injector.get(DialogRefService);

		const a = new Subject<DialogRefService>();

		dialog.onClosed.subscribe(() => compRef.destroy());

		setTimeout(() => {
			a.next(dialog);
		});

		return a.asObservable();
	}
}
