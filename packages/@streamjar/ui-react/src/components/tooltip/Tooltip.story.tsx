import * as React from 'react';

import { Tooltip } from './Tooltip';
import { Button } from '../form/button';

export default {
	title: 'StreamJar UI|Components/Tooltip',
	parameters: {
		component: Tooltip,
	},
};

export const SimpleMenu = React.createElement(() => {
	return (
		<div style={{ padding: 15 }}>
			<h5>Pull: start </h5>
			<Tooltip axis="horizontal" pull="start" message="Lots of tooltips"><Button> horizontal axis </Button></Tooltip>
			<Tooltip axis="vertical" pull="start" message="Lots of tooltips"><Button> vertical axis </Button></Tooltip>
			<h5>Pull: center </h5>
			<Tooltip axis="horizontal" pull="center" message="Lots of tooltips"><Button> horizontal axis </Button></Tooltip>
			<Tooltip axis="vertical" pull="center" message="Lots of tooltips"><Button> vertical axis </Button></Tooltip>
			<h5>Pull: end </h5>
			<Tooltip axis="horizontal" pull="end" message="Lots of tooltips"><Button> horizontal axis </Button></Tooltip>
			<Tooltip axis="vertical" pull="end" message="Lots of tooltips"><Button> vertical axis </Button></Tooltip>
			<h5>Disabled </h5>
			<Tooltip axis="horizontal" pull="end" enabled={false} message="Lots of tooltips"><Button> horizontal axis </Button></Tooltip>
			<Tooltip axis="vertical" pull="end" enabled={false} message="Lots of tooltips"><Button> vertical axis </Button></Tooltip>
		</div>
	);
});
