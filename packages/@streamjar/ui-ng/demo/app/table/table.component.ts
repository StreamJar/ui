import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export enum ITableType {
    INPUT,
    OUTPUT,
    METHOD
}

export interface ITable {
    name: string;
    type: ITableType;
    inType: string;
    defaultValue: string;
    description: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'demo-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
})
export class DemoTableComponent {
    public ITableType = ITableType;

    @Input()
    public docs: ITable[] = []

    @Input()
    public name: string = '';
}