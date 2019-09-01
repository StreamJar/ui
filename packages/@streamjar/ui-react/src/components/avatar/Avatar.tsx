import * as React from 'react';
import { Md5 } from 'ts-md5';

export type IAvatarValue = string | { email?: string; avatar?: string } | undefined;

export interface IAvatarProps {
	size?: number;
	data?: IAvatarValue;
}

export const getGravatar = (email: string): string => {
	return `https://www.gravatar.com/avatar/${Md5.hashStr(email)}`;
};

export function fetchAvatar(data: IAvatarValue): string {
	if (typeof data === 'object') {
		if (data.avatar) {
			return data.avatar;
		} else if (data.email) {
			return getGravatar(data.email);
		}
	} else if (typeof data === 'string') {
		return data;
	}

	return '/assets/noavatar.png';
}

export const Avatar: React.FC<IAvatarProps> = ({ size = 60 , data }: IAvatarProps) => {
	const avatar: string = fetchAvatar(data);

	return (
		<div className="jar-avatar-container" style={{ display: 'inline-flex' }}>
			<img alt="Avatar" className="jar-avatar" src={avatar} width={`${size}px`} height={`${size}px`} />
		</div>
	);
};
