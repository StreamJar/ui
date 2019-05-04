import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import './demo.scss';

export interface IDemoConfig {
	name: string;
	components: IDemoComponent[];
	examples: string;
}

export interface IDemoComponent {
	name: string;
	props: IDemoProp[];
}

export interface IDemoProp {
	name: string;
	default: string | number;
	type: string;
	description: string;
}
export interface IDemoProps {
	config: IDemoConfig;
}

export class Demo extends React.PureComponent<IDemoProps> {
	public render() {
		const { name, components, examples } = this.props.config;

		const docs = (
			<div className="demo__section j-theme-bg-background-accent">
				<h5> Documentation </h5>
				{components.map(component =>  this.getTable(component))}
			</div>
		);

		return (
			<div>
				<h2 className="demo__name"> {name} </h2>

				<div className="demo__section j-theme-bg-background-accent">
					<h5> Example </h5>

					{this.props.children}
				</div>

				{!!components.length && docs}

				<div className="demo__section j-theme-bg-background-accent">
					<h5> Code </h5>
					<MonacoEditor
						height={600}
						theme="vs-dark"
						language="typescript"
						options={{ autoIndent: true }}
						value={examples.trim()}
						/>
				</div>
			</div>
		);
	}

	private getTable(component: IDemoComponent): JSX.Element {
		return (
			<div key={component.name}>
				<p className="elementName"> Element Name: <code> {component.name} </code> </p>
				<table className="table">
					<thead>
						<tr>
							<th className="table__name"> Name </th>
							<th className="table__default"> Default</th>
							<th className="table__intype"> Type</th>
							<th className="table__desc"> Description</th>
						</tr>
					</thead>

					<tbody>
						{component.props.map(prop => this.getPropRow(prop))}
					</tbody>
				</table>
			</div>
		);
	}

	private getPropRow(prop: IDemoProp): JSX.Element {
		return (
			<tr key={prop.name}>
				<td className="table__name"> {prop.name} </td>
				<td className="table__default"> {prop.default} </td>
				<td className="table__intype"> {prop.type} </td>
				<td className="table__desc"> {prop.description} </td>
			</tr>
		);
	}
}
