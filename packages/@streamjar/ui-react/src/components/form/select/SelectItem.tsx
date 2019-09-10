import * as React from 'react';

import { Ripple } from '../../ripple';
import { Checkbox } from '../checkbox';

export type ISelectValue = string | number | boolean;

export interface ISelectItemProps {
	name: string;
	value: ISelectValue;
	values?: ISelectValue[];
	multiple?: boolean;
	onClick?(): void;
}

export const SelectItem: React.FC<ISelectItemProps> = (props: ISelectItemProps) => {
	const { name, multiple, value, values, onClick } = props;

	const active = (values || []).includes(value);

	return (
		<div className="jar-select-item" onClick={onClick} tabIndex={0}>
			<Ripple />

			<div className="jar-select-item__container layout-row">
				{multiple && <div className="jar-select-item__check"><Checkbox value={active} noRipple={true}></Checkbox></div>}

				<span className="jar-select-item__value"> {name} </span>
			</div>
		</div>
	);
};
