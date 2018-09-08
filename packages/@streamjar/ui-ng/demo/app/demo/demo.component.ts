import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ITable } from '../table/table.component';

export interface IDemoConfig {
    docs?: ITable[] | { [key: string]: ITable[] },
    name: string;
    component: string;

    html?: string;
    ts?: string;
    scss?: string;
}

export enum DemoContent {
    HTML,
    SCSS,
    TS,
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'demo',
    styleUrls: ['../common.scss'],
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    public DemoContent = DemoContent;
    public config: IDemoConfig;
    public show: DemoContent = DemoContent.HTML;

    public htmlOpts = {theme: 'vs-dark', language: 'html'};
    public tsOpts = {theme: 'vs-dark', language: 'typescript'};
	public scssOpts = {theme: 'vs-dark', language: 'scss'};

	public tabs: string[] = [];
	public docs: string = '';

    @Input('config')
    public set _config(config: IDemoConfig) {
        this.config = {
            ...config,
            html: config.html && config.html.trim(),
            ts: config.ts && config.ts.trim(),
            scss: config.scss && config.scss.trim(),
        }

		this.show = config.html ? DemoContent.HTML : config.scss ? DemoContent.SCSS : DemoContent.TS;

		if (this.config.docs && (<ITable[]>this.config.docs).length) {
			const ref = <ITable[]>this.config.docs;

			this.config.docs = { [this.config.component]: ref };
		}


		this.tabs = Object.keys(this.config.docs || {});
		this.docs = this.tabs[0];
    }

}
