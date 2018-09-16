import * as React from 'react';

import { Avatar, IAvatar } from '../avatar';

export interface ICardContentProps {
	icon: IAvatar;
}

export class Card extends React.PureComponent {
	public render(): JSX.Element {
		const { children } = this.props;

		return (
			<div className="jar-card layout-column">
				{children}
			</div>
		);
	}
}

export class CardContent extends React.PureComponent<ICardContentProps> {
	public render(): JSX.Element {
		const { children, icon } = this.props;

		return (
			<div className="jar-card__inner layout-row layout-align-start-center layout-column-xs layout-align-center-center-xs">
				{icon && <div className="jar-card__avatar"><Avatar data={icon} size={50}></Avatar></div>}

				<div className="jar-card__content flex">
					{children}
				</div>
			</div>
		);
	}
}

export class CardActions extends React.PureComponent {
	public render(): JSX.Element {
		const { children } = this.props;

		return (
			<div className="jar-card-footer layout-row layout-align-end-center layout-column-xs">
				{children}
			</div>
		);
	}
}
