import * as React from 'react';

export interface IFilterSectionProps {
	name: string;
}

export const FilterSection: React.FC<IFilterSectionProps> = (props: React.PropsWithChildren<IFilterSectionProps>) => {
	const { children, name } = props;

	return (
		<div className="jar-filter-section-container">
			<div className="jar-filter-section">
				<h3 className="jar-filter-section__header"> <small>{name}</small> </h3>

				{children}
			</div>
		</div>
	);
};
