import * as React from 'react';
import { Platforms } from '.';
import { PlatformBrands } from '../../constants';

export default {
	title: 'StreamJar UI|Layouts/Platforms',
	parameters: {
		component: Platforms,
	},
};

export const AllPlatforms = () => {
	return (
		<Platforms platforms={Array.from(PlatformBrands.keys())} onChange={console.log} />
	);
};

export const LimitedPlatforms = () => {
	return (
		<Platforms platforms={['mixer', 'twitch', 'dlive']} />
	);
};

export const DefaultValue = () => {
	return (
		<Platforms value={['mixer', 'twitch']} platforms={['mixer', 'twitch', 'dlive']} />
	);
};
