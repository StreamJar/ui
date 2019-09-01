import * as React from 'react';
import { Avatar } from './Avatar';

export default {
	title: 'StreamJar UI|Components/Avatar',
	parameters: {
		component: Avatar,
	},
};

export const BasicAvatar = () => {
	return <Avatar />;
};

export const CustomSize = () => {
	return (
		<>
			<Avatar size={100} />
			<Avatar size={10} />
		</>
	);
};

export const UsingEmail = () => {
	return (
		<Avatar data={{ email: 'support@streamjar.tv' }} />
	);
};

export const UsingProfileAvatar = () => {
	return (
		<Avatar data={{ avatar: 'https://uploads.mixer.com/avatar/rtgears6-20742.jpg' }} />
	);
};

export const UsingDirectLink = () => {
	return (
		<Avatar data={'https://uploads.mixer.com/avatar/rtgears6-20742.jpg'} />
	);
};
