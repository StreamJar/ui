import * as React from 'react';
import { Link } from './Link';

export default {
	title: 'StreamJar UI|Components/Form/Link',
	parameters: {
		component: Link,
	},
};

export const NormalLink = () => {
	return (
		<>
			<Link colour="primary"> Primary </Link>
			<Link colour="accent"> Accent </Link>
			<Link colour="success"> Success </Link>
			<Link colour="danger"> Danger </Link>
			<Link colour="primary" disabled={true}> Disabled </Link>
		</>
	);
};

export const RaisedLink = () => {
	return (
		<>
			<Link raised={true} colour="primary"> Primary </Link>
			<Link raised={true} colour="accent"> Accent </Link>
			<Link raised={true} colour="success"> Success </Link>
			<Link raised={true} colour="danger"> Danger </Link>
			<Link raised={true} colour="primary" disabled={true}> Disabled </Link>
		</>
	);
};

export const TouchableNormalLink = () => {
	return (
		<div className="j-touchable">
			<Link colour="primary"> Primary </Link>
			<Link colour="accent"> Accent </Link>
			<Link colour="success"> Success </Link>
			<Link colour="danger"> Danger </Link>
			<Link colour="primary" disabled={true}> Disabled </Link>
		</div>
	);
};

export const TouchableRaisedLink = () => {
	return (
		<div className="j-touchable">
			<Link raised={true} colour="primary"> Primary </Link>
			<Link raised={true} colour="accent"> Accent </Link>
			<Link raised={true} colour="success"> Success </Link>
			<Link raised={true} colour="danger"> Danger </Link>
			<Link raised={true} colour="primary" disabled={true}> Disabled </Link>
		</div>
	);
};

export const LinkVariants = () => {
	return (
		<>
			<Link raised={true} colour="primary" icon="star"> Primary </Link>
			<Link raised={true} colour="accent" icon="star" iconRight={true}> Accent </Link>
			<Link raised={true} colour="success" icon="star"> </Link>
			<Link raised={true} colour="danger" icon="star" round={true} />
		</>
	);
};
