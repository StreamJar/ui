import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';
import { JarDialogLoadableComponent, JarDialogService } from 'index';

const html = `
<button jarBtn raised (click)="normalDialog()"> Normal </button>
<button jarBtn raised (click)="statefulDialog()"> Stateful </button>
`

const ts = `
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { JarDialogLoadableComponent, JarDialogService } from '@streamjar/ui';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-dialog',
    templateUrl: './dialog.demo.html'
})
export class Dialog {
	constructor(private dialog: JarDialogService) {}

	public normalDialog() {
		this.dialog.show(NormalComponent, {});
	}

	public statefulDialog() {
		this.dialog.show(StatefulComponent, {});
	}

}

const TIMEOUT = 1000;

@Component({
	selector: 'jar-demo-dialog-stateful',
	template: \`
		<jar-dialog-loading #dialog width="40vw">
			<jar-dialog-header>
				Stateful Dialog.
			</jar-dialog-header>

			<jar-dialog-content>
				<h2> Hai! You're {{username}}</h2>
			</jar-dialog-content>
		</jar-dialog-loading>
	\`,
})
export class StatefulComponent {

	@ViewChild('dialog')
	private dialog: JarDialogLoadableComponent;

	public username: string;

	constructor() {
		setTimeout(() => {
			this.username = 'david';
			this.dialog.loaded();
		}, TIMEOUT);
	}
}


@Component({
	selector: 'jar-dialog-normal',
	template: \`
	<jar-dialog width="40vw">
		<jar-dialog-header>
			Normal Dialog.
		</jar-dialog-header>

		<jar-dialog-content>
			<h2> Hai! </h2>
		</jar-dialog-content>
	</jar-dialog>
	\`,
})
export class NormalComponent {

}
`
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-dialog',
    styleUrls: ['../../common.scss'],
    templateUrl: './dialog.demo.html'
})
export class DialogDemoComponent {
    public config: IDemoConfig = {
        docs: {
			'jar-dialog': [
				{
					name: 'height',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Height of the dialog.'
				},
				{
					name: 'width',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Width of the dialog.'
				},
				{
					name: 'minHeight',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum height of the dialog.'
				},
				{
					name: 'minWidth',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum width of the dialog.'
				},
			],
			'jar-dialog-stateful': [
				{
					name: 'height',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Height of the dialog.'
				},
				{
					name: 'width',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Width of the dialog.'
				},
				{
					name: 'minHeight',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum height of the dialog.'
				},
				{
					name: 'minWidth',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum width of the dialog.'
				},
				{
					name: 'loaded',
					type: ITableType.METHOD,
					inType: 'void',
					defaultValue: '',
					description: 'Call when loading is complete.'
				},
				{
					name: 'fetching',
					type: ITableType.METHOD,
					inType: 'void',
					defaultValue: '',
					description: 'Call when we want to load.'
				},
			],
		},
        name: 'Dialog',
        component: 'jar-dialog-normal',
		html,
		ts,
	}

	constructor(private dialog: JarDialogService) {}

	public normalDialog() {
		this.dialog.show(NormalComponent, {});
	}

	public statefulDialog() {
		this.dialog.show(StatefulComponent, {});
	}

}

const TIMEOUT = 1000000;

@Component({
	selector: 'jar-demo-dialog-stateful',
	template: `
		<jar-dialog-loading #dialog width="40vw">
			<jar-dialog-header>
				Stateful Dialog.
			</jar-dialog-header>

			<jar-dialog-content>
				<h2> Hai! You're {{username}}</h2>
			</jar-dialog-content>
		</jar-dialog-loading>
	`,
})
export class StatefulComponent {

	@ViewChild('dialog', { static: true })
	private dialog: JarDialogLoadableComponent;

	public username: string;

	constructor() {
		setTimeout(() => {
			this.username = 'david';
			this.dialog.loaded();
		}, TIMEOUT);
	}
}


@Component({
	selector: 'jar-dialog-normal',
	template: `
	<jar-dialog width="40vw">
		<jar-dialog-header>
			Normal Dialog.
		</jar-dialog-header>

		<jar-dialog-content>
			<h2> Hai! </h2>
		</jar-dialog-content>
	</jar-dialog>
	`,
})
export class NormalComponent {

}
