import * as React from 'react';
import * as classNames from 'classnames';

import { InputLabel } from '../input/InputLabel';
import { Icon } from '../../icon';
import { ISelectValue } from './SelectItem';

export interface ISelectInputProps {
	title?: string;
	multiple?: boolean;
	valueMap: React.MutableRefObject<Map<ISelectValue, string>>;
	values: ISelectValue[];
	toggleDropdown(e: React.MouseEvent<HTMLDivElement>): void;

}
export const SelectInput: React.FC<ISelectInputProps> = (props: ISelectInputProps) => {
	const { title, multiple, toggleDropdown, values, valueMap } = props;

	const [selectFocus, setInputFocus] = React.useState(false);

	const focus = () => {
		setInputFocus(true);
	};

	const blur = () => {
		setInputFocus(false);
	};

	const classes = classNames('jar-select layout-row', {
		'jar-select-multiple': multiple,
		'jar-select-focus': selectFocus,
	});

	const wrapper = classNames('layout-row layout-row-wrap layout-align-start-center flex', {
		'jar-select__items': multiple,
		'jar-select__option': !multiple,
	});

	const getValidItems = (): (JSX.Element | string)[] => {
		return values.map(i => valueMap.current.get(i)).filter(a => a !== undefined)
			.map(i => {
				if (multiple) {
					return <div key={i} className="jar-select__item">{i}</div>;
				}

				return i!;
			});
	};

	return (
		<>
			{title && <InputLabel>{title}</InputLabel>}

			<div className={classes} onClick={toggleDropdown} tabIndex={0} onFocus={focus} onBlur={blur}>
				<div className={wrapper}>
					{getValidItems()}
				</div>

				<div className="jar-select__ui layout-column layout-align-center-center">
					<Icon icon="arrow_drop_down" />
				</div>
			</div>
		</>
	);
};
