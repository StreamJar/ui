import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	ReflectiveInjector,
	TemplateRef,
} from '@angular/core';

@Injectable()
export class JarDialogOutlet2Service {
	private ref: HTMLElement;

	constructor(
		private appRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	private getView(): HTMLElement {
		if (!this.ref) {
			this.ref = document.createElement('div');
			this.ref.className = 'jar-outlet';
			document.body.appendChild(this.ref);
		}

		return this.ref;
	}

	public createFromRef(component: any, providers: any, resolver?): ComponentRef<any> {
		const factoryResolver = (resolver || this.componentFactoryResolver).resolveComponentFactory(component);
		const comp = factoryResolver.create(ReflectiveInjector.resolveAndCreate(providers));

		this.appRef.attachView(comp.hostView);
		this.getView().appendChild((<any>comp.hostView).rootNodes[0])

		return comp;
	}

	public createFromTemplate(template: TemplateRef<any>, viewContainer,  c): any {
		const tmplRef = viewContainer.createEmbeddedView(template, c);

		tmplRef.rootNodes.forEach(node => {
			this.getView().appendChild(node);
		})

		return tmplRef;
	}
}
