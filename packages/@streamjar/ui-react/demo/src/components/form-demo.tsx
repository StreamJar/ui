import * as React from 'react';
import * as yup from 'yup';

import { Button, Form, Input, Textarea } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class FormDemo extends React.PureComponent {
	public config: IDemoConfig = {
		name: 'Input / Form',
		components: [{
			name: 'Form',
			props: [{
				name: 'validation',
				default: '',
				type: 'yup.ObjectSchema',
				description: 'yup validation object',
			}, {
				name: 'onSubmit',
				default: '',
				type: '() => void',
				description: 'Called when the form is submitted while valid',
			}],
		}, {
			name: 'Input',
			props: [
				{
					name: 'name',
					default: '',
					type: 'string',
					description: 'A unique identfiier for this input, used in validation',
				}, {
					name: 'title',
					default: '',
					type: 'string',
					description: 'Title of the input',
				}, {
					name: 'value',
					default: '',
					type: 'string',
					description: 'Value of the textarea',
				}, {
					name: 'type',
					default: 'text',
					type: 'string',
					description: 'Type of the input',
				}, {
					name: 'prefix',
					default: '',
					type: 'React.Element',
					description: 'Component to prefix the input width',
				}, {
					name: 'suffix',
					default: '',
					type: 'React.Element',
					description: 'Component to suffix the input width',
				}, {
					name: 'min',
					default: '',
					type: 'number',
					description: 'Minimum value of the input (number)',
				}, {
					name: 'max',
					default: '',
					type: 'number',
					description: 'Maximum value of the input (number)',
				}, {
					name: 'step',
					default: '',
					type: 'number',
					description: 'Step interval of the input (number)',
				}, {
					name: 'pattern',
					default: '',
					type: 'string',
					description: 'Pattern validation of the input (number)',
				}, {
					name: 'placeholder',
					default: '',
					type: 'string',
					description: 'Placeholder for the textarea',
				}, {
					name: 'onChange',
					default: '() => { }',
					type: '(value: string) => void',
					description: 'Callback when the textarea changes',
				}],
			}, {
			name: 'Textarea',
			props: [
				{
					name: 'name',
					default: '',
					type: 'string',
					description: 'A unique identfiier for this input, used in validation',
				}, {
					name: 'title',
					default: '',
					type: 'string',
					description: 'Title of the input',
				}, {
					name: 'value',
					default: '',
					type: 'string',
					description: 'Value of the textarea',
				}, {
					name: 'rows',
					default: '',
					type: 'number',
					description: 'Number of rows the textarea has',
				}, {
					name: 'resize',
					default: 'false',
					type: 'boolean',
					description: 'If the textarea should automatically grow',
				}, {
					name: 'readonly',
					default: 'false',
					type: 'boolean',
					description: 'If the textarea is readonly',
				}, {
					name: 'placeholder',
					default: '',
					type: 'string',
					description: 'Placeholder for the textarea',
				}, {
					name: 'onChange',
					default: '() => { }',
					type: '(value: string) => void',
					description: 'Callback when the textarea changes',
				},
			],
		}],
		examples: `
public validation = yup.object().shape({
	name: yup.string().required().min(1).max(5),
	age: yup.number().required().max(5),
	cost: yup.number().required().max(5),
	multiplier: yup.number().required(),
	meaning: yup.string().min(10),
	something: yup.string().min(10),
});

public render(): JSX.Element {
	return (
		<Demo config={this.config}>
			<Form validation={this.validation}>
				<Input name="name" type="text" title="Suffix" value="hello" />
				<Input name="age" type="number" title="Age" value="1" />
				<Input name="cost" type="number" title="cost" value="1" prefix={<span>£</span>}/>
				<Input name="multiplier" type="number" title="multiplier" value="1" suffix={<span>x</span>}/>

				<Textarea name="meaning" title="description"></Textarea>
				<Textarea name="something" rows={5} title="magic"></Textarea>

				<Button icon="save">Save</Button>
			</Form>
		</Demo>
	);
}
		`,
	};

	public validation = yup.object().shape({
		name: yup.string().required().min(1).max(5),
		age: yup.number().required().max(5),
		cost: yup.number().required().max(5),
		multiplier: yup.number().required(),
		meaning: yup.string().min(10),
		something: yup.string().min(10),
	});

	public render(): JSX.Element {
		return (
			<Demo config={this.config}>
				<Form validation={this.validation}>
					<Input name="name" type="text" title="Suffix" value="hello" />
					<Input name="age" type="number" title="Age" value="1" />
					<Input name="cost" type="number" title="cost" value="1" prefix={<span>£</span>}/>
					<Input name="multiplier" type="number" title="multiplier" value="1" suffix={<span>x</span>}/>

					<Textarea name="meaning" title="description"></Textarea>
					<Textarea name="something" rows={5} title="magic"></Textarea>

					<Button icon="save">Save</Button>
				</Form>
			</Demo>
		);
	}
}
