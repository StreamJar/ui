import * as React from 'react';
import { Button } from './Button';

export default {
	title: 'StreamJar UI|Components/Form/Button',
	parameters: {
		component: Button,
	},
};

export const NormalButton = () => {
	return (
		<>
			<Button type="button" colour="primary"> Primary </Button>
			<Button type="button" colour="accent"> Accent </Button>
			<Button type="button" colour="success"> Success </Button>
			<Button type="button" colour="danger"> Danger </Button>
			<Button type="button" colour="primary" disabled={true}> Disabled </Button>
		</>
	);
};

export const RaisedButton = () => {
	return (
		<>
			<Button type="button" raised={true} colour="primary"> Primary </Button>
			<Button type="button" raised={true} colour="accent"> Accent </Button>
			<Button type="button" raised={true} colour="success"> Success </Button>
			<Button type="button" raised={true} colour="danger"> Danger </Button>
			<Button type="button" raised={true} colour="primary" disabled={true}> Disabled </Button>
		</>
	);
};

export const TouchableButton = () => {
	return (
		<div className="j-touchable">
			<Button type="button" colour="primary"> Primary </Button>
			<Button type="button" colour="accent"> Accent </Button>
			<Button type="button" colour="success"> Success </Button>
			<Button type="button" colour="danger"> Danger </Button>
			<Button type="button" colour="primary" disabled={true}> Disabled </Button>
		</div>
	);
};

export const TouchableRaisedButton = () => {
	return (
		<div className="j-touchable">
			<Button type="button" raised={true} colour="primary"> Primary </Button>
			<Button type="button" raised={true} colour="accent"> Accent </Button>
			<Button type="button" raised={true} colour="success"> Success </Button>
			<Button type="button" raised={true} colour="danger"> Danger </Button>
			<Button type="button" raised={true} colour="primary" disabled={true}> Disabled </Button>
		</div>
	);
};

export const ButtonVariants = () => {
	return (
		<div className="layout-row">
			<Button type="button" raised={true} colour="primary" icon="star"> Primary </Button>
			<Button type="button" raised={true} colour="accent" icon="star" iconRight={true}> Accent </Button>
			<Button type="button" raised={true} colour="success" icon="star"> </Button>
			<Button type="button" raised={true} colour="danger" icon="star" round={true} />
			<Button type="button" raised={true} colour="danger" round={true}>aaa</Button>
		</div>
	);
};
