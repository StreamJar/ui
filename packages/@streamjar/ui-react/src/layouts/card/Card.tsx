import * as React from 'react';

import { Avatar, AvatarValue } from '../../components/avatar';

export interface ICardContentProps {
	icon?: AvatarValue;
}

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => (
	<div className="jar-card layout-column">
		{children}
	</div>
);

export const CardContent: React.FC<React.PropsWithChildren<ICardContentProps>> =
	({ icon, children }: React.PropsWithChildren<ICardContentProps>) => (
		<div className="jar-card__inner layout-row layout-align-start-center layout-column-xs layout-align-center-center-xs">
			{icon && <div className="jar-card__avatar"><Avatar data={icon} size={50}></Avatar></div>}

			<div className="jar-card__content flex">
				{children}
			</div>
		</div>
	);

export const CardActions: React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => (
	<div className="jar-card-footer layout-row layout-align-end-center layout-column-xs">
		{children}
	</div>
);
