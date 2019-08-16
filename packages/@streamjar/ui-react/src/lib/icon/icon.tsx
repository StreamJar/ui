import * as React from 'react';
import { default as InlineSVG } from 'react-inlinesvg';

export interface IIconProps {
	icon: string;
	colour?: string;
}

export class Icon extends React.PureComponent<IIconProps> {
	public render(): JSX.Element {
		const { colour } = this.props;
		let { icon } = this.props;

		let container;
		let family = 'material';

		if (icon.startsWith('jar_')) {
			family = 'jar';
			icon = icon.replace('jar_', '');
		}

		if (icon.startsWith('fa_')) {
			family = 'fa';
			icon = icon.replace('fa_', '');
		}

		if (family === 'material') {
			container = <i className="material-icons">{icon}</i>;
		} else if (family === 'fa') {
			container = <div className="jar-icons"><InlineSVG cacheRequests={true} uniquifyIDs={true} src={`/assets/icons/fa/${icon}.svg`}></InlineSVG></div>;
		} else {
			container = <div className="jar-icons"><InlineSVG cacheRequests={true} uniquifyIDs={true} src={`/assets/icons/${icon}.svg`}></InlineSVG></div>;
		}

		return <div className="jar-icon" style={{ color: colour }}>{container}</div>;
	}
}
