import * as React from 'react';
import { Button } from '../../components/form/button';
import { CardContent, Card, CardActions } from './Card';

export default {
	title: 'StreamJar UI|Layouts/Card',
	parameters: {
		component: Card,
	},
};

export const CardActionsContent = () => {
	return (
		<Card>
			<CardContent icon={''}>
				<h3> Test Client </h3>
				<p style={{ color: '#FFF', paddingTop: 5, opacity: 0.7 }}> Client ID: aaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>
			</CardContent>

			<CardActions>
				<Button raised={true}> Edit </Button>
				<Button round={true} raised={true} colour="danger" icon="delete" />
			</CardActions>
		</Card>
	);
};


export const BasicCard = () => {
	return (
		<Card>
			<CardContent>
				<h3> Test Client </h3>
			</CardContent>
		</Card>
	);
};

export const CardIcon = () => {
	return (
		<Card>
			<CardContent icon={{ email: 'support@streamjar.tv'}}>
				<h3> Test Client </h3>
			</CardContent>
		</Card>
	);
};
