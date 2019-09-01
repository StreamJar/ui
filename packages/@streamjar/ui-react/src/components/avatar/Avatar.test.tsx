import * as React from 'react';
import { fetchAvatar, getGravatar, Avatar } from './Avatar';
import { shallow } from 'enzyme';

describe('Avatar', () => {
	test('it parses a path', () => {
		expect(fetchAvatar('test')).toBe('test');
	});

	test('it parses an email', () => {
		expect(fetchAvatar({ email: 'luke@thompsonuk.me' })).toContain('gravatar.com');
	});

	test('it parses an avatar', () => {
		expect(fetchAvatar({ avatar: 'me.png' })).toBe('me.png');
	});

	test('it parses an undefined object', () => {
		expect(fetchAvatar(undefined)).toBe('/assets/noavatar.png');
	});

	test('it generates a gravatar', () => {
		expect(getGravatar('support@streamjar.tv')).toBe('https://www.gravatar.com/avatar/1dac11ee3831f04f9e15e66424d9c5a2');
	});

	test('it renders with no props', () => {
		expect(shallow(<Avatar />).contains(
			<img className="jar-avatar" alt="Avatar" src="/assets/noavatar.png" width="60px" height="60px" />,
		)).toBe(true);
	});

	test('it has customisable size', () => {
		expect(shallow(<Avatar size={30} />).contains(
			<img className="jar-avatar" alt="Avatar" src="/assets/noavatar.png" width="30px" height="30px" />,
		)).toBe(true);
	});

	test('it accepts an object', () => {
		expect(shallow(<Avatar size={30} data={{ avatar: '/assets/jar.png' }} />).contains(
			<img className="jar-avatar" alt="Avatar" src="/assets/jar.png" width="30px" height="30px" />,
		)).toBe(true);
	});

	test('it accepts an direct link', () => {
		expect(shallow(<Avatar size={30} data={'https://cdn.streamjar.tv/assets/jar.png'} />).contains(
			<img className="jar-avatar" alt="Avatar" src="https://cdn.streamjar.tv/assets/jar.png" width="30px" height="30px" />,
		)).toBe(true);
	});
});
