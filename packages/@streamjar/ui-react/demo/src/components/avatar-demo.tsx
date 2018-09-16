import * as React from 'react';

import { Avatar } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class AvatarDemo extends React.Component {
	public config: IDemoConfig  = {
		name: 'Avatar',
		components: [{
			name: 'Avatar',
			props: [
				{
					name: 'size',
					default: 50,
					type: 'number',
					description: 'Width and height of the element',
				},
				{
					default: '',
					// tslint:disable-next-line max-line-length
					description: 'URL to the avatar, or an object containing the `avatar` property. Alternatively an object with email which is used for gravatar.',
					name: 'data',
					type: 'string | { email?: string, avatar?: string }',
				},
			],
		}],
		examples: `
<Avatar data={{ email: 'luke@streamjar.tv'}}></Avatar>
<Avatar data={{ avatar: 'https://surl.im/images/icon.ico'}}></Avatar>
<Avatar size={50} data="https://surl.im/images/icon.ico"></Avatar>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<Avatar data={{ email: 'luke@streamjar.tv'}}></Avatar>
				<Avatar data={{ avatar: 'https://surl.im/images/icon.ico'}}></Avatar>
				<Avatar size={50} data="https://surl.im/images/icon.ico"></Avatar>
			</Demo>
		);
	}
}
