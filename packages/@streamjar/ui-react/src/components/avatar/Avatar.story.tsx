import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar } from './Avatar';

storiesOf('Components/Avatar', module)
	.add('standard avatar', () => (
		<Avatar />
	))
	.add('custom size', () => (
		<div>
			<Avatar size={100}/>
			<Avatar size={10}/>
		</div>
	))
	.add('using email', () => (
		<Avatar data={{ email: 'support@streamjar.tv' }} />
	))
	.add('using profile avatar', () => (
		<Avatar data={{ avatar: 'https://uploads.mixer.com/avatar/rtgears6-20742.jpg' }} />
	))
	.add('using direct link', () => (
		<Avatar data={'https://uploads.mixer.com/avatar/rtgears6-20742.jpg'} />
	));
