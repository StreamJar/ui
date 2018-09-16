import * as React from 'react';
import { Md5 } from 'ts-md5';

export type IAvatar = string | { email?: string; avatar?: string };

export interface IAvatarParams {
	size?: number;
	data: IAvatar;
}

export const getGravatar = (email: string): string => {
	return `https://www.gravatar.com/avatar/${Md5.hashStr(email)}`;
};

export class Avatar extends React.PureComponent<IAvatarParams> {
	public static defaultProps: Partial<IAvatarParams> = {
		data: '/assets/noavatar.png',
		size: 60,
	};

	public render(): JSX.Element {
		const { size, data } = this.props;

		let avatar = '/assets/noavatar.png';

		if (typeof data === 'object') {
			if (data.avatar) {
				avatar = data.avatar;
			} else if (data.email) {
				avatar = getGravatar(data.email);
			}
		} else {
			avatar = data;
		}

		return (
			<div className="jar-avatar-container" style={{ display: 'inline-flex' }}>
				<img alt="Avatar" className="jar-avatar" src={avatar} width={`${size}px`} height={`${size}px`} />
			</div>
		);
	}
}
