import * as React from 'react';
import * as classnames from 'classnames';

export interface ISectionProps {
	/** Header component */
	header?: JSX.Element;

	/** an action to display */
	action?: JSX.Element;

	/** Whether the action is tabs */
	tabs?: boolean;

	/** Whether we are only displaying tabs */
	onlyTabs?: boolean;
}

/** Display a section */
export const Section = (props: React.PropsWithChildren<ISectionProps>) => {
	const { tabs, onlyTabs, header, action, children } = props;

	const className = classnames({
		'jar-section__header': true,
		'jar-section__tabs': tabs,
		'layout-align-end-center': true,
		'layout-column-reverse.xs': onlyTabs,
		'layout-column.xs': !onlyTabs,
		'layout-row': !onlyTabs,
		'layout-row-reverse': onlyTabs,
	});

	return (
		<div className="jar-section">
			<div className={className}>
				<h2 className="jar-section__title">
					{header && <div className="jar-section-header" style={{ padding: onlyTabs ? 0 : undefined }}> {header} </div>}
				</h2>
				<span className="flex"></span>
				{action && <div className="jar-section-action"> {action} </div>}
			</div>
			<div className="jar-section__content">
				{children}
			</div>
		</div>
	);
};
