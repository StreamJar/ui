import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from './Spinner';

storiesOf('Components/Spinner', module)
	.add('standard spinner', () => (
		<Spinner />
	))
	.add('custom size', () => (
		<Spinner size={100}/>
	));
