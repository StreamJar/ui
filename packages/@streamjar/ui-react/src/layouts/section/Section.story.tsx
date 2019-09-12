import * as React from 'react';
import { Section } from './Section';
import { Button } from '../../components/form/button';
import { Spinner } from '../../components/spinner';
import { Tabs, Tab } from '../../components/tabs';

export default {
	title: 'StreamJar UI|Layouts/Section',
	parameters: {
		component: Section,
	},
};

export const BasicSection = () => {
	return (
		<Section>
			<h2> hi </h2>
		</Section>
	);
};

export const SectionWithHeader = () => {
	return (
		<Section header={<React.Fragment>OAuth Clients</React.Fragment>}>
			<div className="layout-row layout-wrap">
				<Spinner />
			</div>
		</Section>
	);
};

export const SectionWithAction = () => {
	return (
		<Section
			header={<React.Fragment>OAuth Clients</React.Fragment>}
			action={<div style={{ marginRight: 20 }}><Button raised={true}> Create Client</Button></div>}>

			<div className="layout-row layout-wrap">
				<Spinner />
			</div>
		</Section>
	);
};

export const SectionWithTabs = () => {
	return (
		<Section
			tabs={true}
			header={<React.Fragment>Account Settings</React.Fragment>}
			action={<Tabs><Tab value={'one'}>One</Tab><Tab value="two">Two</Tab></Tabs>}>

			<div className="layout-row layout-wrap">
				<Spinner />
			</div>
		</Section>
	);
};
export const SectionWithTabsAndButton = () => {
	return (
		<Section
			tabs={true}
			onlyTabs={true}
			header={<Button raised={true}>Login</Button>}
			action={<Tabs><Tab value={'one'}>One</Tab><Tab value="two">Two</Tab></Tabs>}>

			<div className="layout-row layout-wrap">
				<Spinner />
			</div>
		</Section>
	);
};
