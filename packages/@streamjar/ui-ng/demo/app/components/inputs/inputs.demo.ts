import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-file [accept]="'image/jpeg'">
	<button jarBtn raised colour="success" icon="file_upload"> Upload</button>
</jar-file>


<jar-input name="a" type="text" title="Text" value="hello"></jar-input>
<jar-input [ngModel]="5" name="b" type="number" title="Number" [min]="2" [max]="10" required> </jar-input>

<jar-input name="a" type="text" title="Prefix" value="hello"><jar-input-prefix>£</jar-input-prefix></jar-input>
<jar-input name="a" type="text" title="Suffix" value="hello"><jar-input-suffix>x points</jar-input-suffix></jar-input>

<jar-input name="a" type="text" title="Suffix" value="hello"></jar-input>

<jar-textarea title="static" rows="5" [ngModel]="'blah'"></jar-textarea>
<jar-textarea title="dynamic size" resize rows="2"></jar-textarea>

<jar-input
[ngModel]=" 'a'"
readonly
name="name"
title="Client Name"
required
minlength="4"
maxlength="24">
</jar-input>

<jar-input required minlength="3" name="a" type="text" title="Text" value="hello"></jar-input>

`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-inputs',
    styleUrls: ['../../common.scss'],
    templateUrl: './inputs.demo.html'
})
export class InputsDemoComponent {
    public config: IDemoConfig = {
        docs: {
			'jar-file': [
				{
					name: 'accept',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Mime types to filter by.'
				}
			],
			'jar-input': [
				{
					name: 'minlength',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum length for the text.'
				},
				{
					name: 'maxlength',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Maxmimum length for the text.'
				},
				{
					name: 'min',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Minimum value for a number.'
				},
				{
					name: 'max',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Maxmimum value for a number.'
				},
				{
					name: 'step',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Step for a number input.'
				},
				{
					name: 'pattern',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'RegExp that the input must abide by.'
				},
				{
					name: 'readonly',
					type: ITableType.INPUT,
					inType: 'boolean',
					defaultValue: '',
					description: 'If the input is readonly'
				},
				{
					name: 'title',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Title of the input.'
				},
				{
					name: 'type',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Type of the input (text, number, date..).'
				},
				{
					name: 'placeholder',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Placeholder value of the input.'
				},
				{
					name: 'value',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'value of the input.'
				}
			],
			'jar-textarea': [
				{
					name: 'readonly',
					type: ITableType.INPUT,
					inType: 'boolean',
					defaultValue: '',
					description: 'If the input is readonly'
				},
				{
					name: 'maxlength',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Maxmimum length for the text.'
				},
				{
					name: 'placeholder',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Placeholder value of the input.'
				},
				{
					name: 'title',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'Title of the input.'
				},
				{
					name: 'rows',
					type: ITableType.INPUT,
					inType: 'number',
					defaultValue: '',
					description: 'Minimum number of rows to display'
				},
				{
					name: 'value',
					type: ITableType.INPUT,
					inType: 'string',
					defaultValue: '',
					description: 'value of the input.'
				},
				{
					name: 'resize',
					type: ITableType.INPUT,
					inType: 'boolean',
					defaultValue: 'false',
					description: 'If we should auto resize the element to fit the content.'
				},

			],
			'jar-input-prefix': [
			],
			'jar-input-suffix': [
			],
		},
        name: 'Inputs',
        component: 'jar-input',
        html,
    }
}
