import * as React from 'react';

import { Button, Section, Tab, Tabs } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class SectionDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Section',
		components: [{
			name: 'Section',
			props: [{
				name: 'tabs',
				type: 'boolean',
				default: 'false',
				description: 'If the section contains tabs',
			}, {
				name: 'onlyTabs',
				type: 'boolean',
				default: 'false',
				description: 'If the section ONLY contains tabs',
			}, {
				name: 'header',
				type: 'JSX.Element',
				default: '',
				description: 'Content to include in the header of the section',
			}, {
				name: 'action',
				type: 'JSX.Element',
				default: '',
				description: 'Content to include in the action of the section',
			}],
		}],
		examples: `
public render() {
	const action = (
		<Tabs>
			<Tab value={0}>Tips</Tab>
			<Tab value={1}>Subscribers</Tab>
			<Tab value={2}>Charity Donations</Tab>
		</Tabs>
	);

	return (
		<Section header={<React.Fragment>Header</React.Fragment>} action={<Button raised={true}>Hi!</Button>}>
			Content!
		</Section>

		<Section tabs={true} onlyTabs={true} header={<Button icon="add" raised={true} disabled={true}> Create Goal </Button>} action={action}>
			<h2> hello </h2>
		</Section>
	);
}
		`,
	};

	public render() {
		const action = (
			<Tabs>
				<Tab value={0}>Tips</Tab>
				<Tab value={1}>Subscribers</Tab>
				<Tab value={2}>Charity Donations</Tab>
			</Tabs>
		);

		return (
			<Demo config={this.config}>
				<Section header={<React.Fragment>Header</React.Fragment>} action={<Button raised={true}>Hi!</Button>}>
					Content!
				</Section>

				<Section tabs={true} onlyTabs={true} header={<Button icon="add" raised={true} disabled={true}> Create Goal </Button>} action={action}>
					<h2> hello </h2>
				</Section>
			</Demo>
		);
	}
}
