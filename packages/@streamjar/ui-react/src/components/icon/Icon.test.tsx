import * as React from 'react';
import { calculateFontPack, FontLookup, Icon } from './Icon';
import { shallow } from 'enzyme';
import InlineSVG from 'react-inlinesvg';

describe('Icon', () => {
	test('it parses font awesome', () => {
		expect(calculateFontPack('fa_star')).toMatchObject({
			family: 'jar-icons',
			icon: 'star',
			mode: FontLookup.REMOTE,
			prefix: '/assets/icons/fa',
		});
	});

	test('it parses material', () => {
		expect(calculateFontPack('delete')).toMatchObject({
			family: 'material-icons',
			icon: 'delete',
			mode: FontLookup.INLINE,
		});
	});

	test('it parses internal icons', () => {
		expect(calculateFontPack('jar_jar')).toMatchObject({
			family: 'jar-icons',
			icon: 'jar',
			mode: FontLookup.REMOTE,
			prefix: '/assets/icons',
		});
	});

	test('it renders a material icon', () => {
		expect(shallow(<Icon icon="delete" />).contains((
			<div className="jar-icon" style={{ color: undefined }}>
				<i className="material-icons">delete</i>
			</div>
		))).toBe(true);
	});

	test('it renders an internal icon', () => {
		expect(shallow(<Icon icon="jar_delete" />).contains((
			<div className="jar-icon" style={{ color: undefined }}>
				<div className={'jar-icons'}>
					<InlineSVG cacheRequests={true} uniquifyIDs={true} src="/assets/icons/delete.svg" />
				</div>
			</div>
		))).toBe(true);
	});
});
