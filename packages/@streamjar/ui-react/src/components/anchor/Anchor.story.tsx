import * as React from 'react';
import { Anchor } from './Anchor';
import { Button } from '../form/button';

export default {
	title: 'StreamJar UI|Components/Anchor',
	parameters: {
		component: Anchor,
	},
};

export const BasicAnchor = () => {
	return (
		<h5> // todo: fix storybook's implosion </h5>
	);
};

// storybook explodes?
// export const BasicAnchor = React.createElement(() => {
// 	const div = React.useRef(null);

// 	console.log(div.current);

// 	return (
// 		<div>
// 			<div ref={div}> <Button raised={true}> hi </Button></div>

// 			{div.current && <Anchor anchorTo={div.current as any}> <Button raised={true} colour="danger"> danger </Button> </Anchor>}
// 		</div>
// 	);
// });
