import * as React from 'react';

import { Button } from '../form/button';
import { Toasts } from './Toasts';

export default {
	title: 'StreamJar UI|Components/Toasts',
};

export const SimpleMenu = React.createElement(() => {
	const info = () => {
		Toasts.info('This is an informative toast', 2000);
	};

	const success = () => {
		Toasts.success('This is an successful toast');
	};

	const danger = () => {
		Toasts.error('This is an dangerous toast');
	};

	return (
		<div style={{ padding: 15 }}>
			<Button raised={true} onClick={info}> Info </Button>
			<Button colour="success" raised={true} onClick={success}> Success </Button>
			<Button colour="danger" raised={true} onClick={danger}> Error </Button>
		</div>
	);
});
