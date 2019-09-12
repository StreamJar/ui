import * as React from 'react';
import { useMenu, Menu } from '../../menu/Menu';
import { SelectInput } from './SelectInput';
import { Spinner } from '../../spinner';
import { ISelectItemProps, ISelectValue } from './SelectItem';
import { SelectSearch } from './SelectSearch';

export interface ISelectProps {
	/** Title of the select */
	title?: string;

	/** Whether this is multiple choice */
	multiple?: boolean;

	/** Whether searching is enabled */
	search?: boolean;

	/** Whether we are currently searching */
	searching?: boolean;

	/** Whether we support adding the search value as an option */
	searchAsOption?: boolean;

	/** The value of the select */
	value?: ISelectValue | ISelectValue[];

	/** When the select value changes */
	onChange?(val: ISelectValue | ISelectValue[]): void;

	/** When the user searches */
	onSearch?(val: string): void;

	/** When an item is requested to be added */
	onAddItem?(val: string): void;
}

/**
 * Display a select dropdown
 */
export const Select: React.FC<React.PropsWithChildren<ISelectProps>> = (props: React.PropsWithChildren<ISelectProps>) => {
	const { title, value, multiple, search, searching, onChange, searchAsOption, onSearch, onAddItem, children } = props;
	const valueMap: React.MutableRefObject<Map<ISelectValue, string>> = React.useRef(new Map());

	const normaliseValues = () => {
		if (value === undefined) {
			return [];
		}

		let arr = Array.isArray(value) ? value : [value];

		if (!multiple && arr[0] !== undefined) {
			arr = [arr[0]];
		}

		return arr;
	};

	const [values, setValues] = React.useState<ISelectValue[]>(normaliseValues());

	React.useEffect(() => {
		setValues(normaliseValues());
	},              [value]);

	const { onMenuOpen, menuProps, closeMenu } = useMenu({ anchorWidth: true, supportContentClick: true, maxHeight: 400 });

	const onClick = (val: ISelectValue) => {
		let newVal: ISelectValue[] = [val];

		if (multiple) {
			if (values.includes(val)) {
				newVal = values.filter(i => i !== val);
			} else {
				newVal = [...values, val];
			}
		}

		newVal = newVal.filter(i => valueMap.current.has(i));

		setValues(newVal);

		if (onChange) {
			onChange(multiple ? newVal : newVal[0]);
		}
	};

	const childs = React.Children.map(children, child => {
		const item = child as React.ReactElement<ISelectItemProps & { children: string }> | null;

		if (!item) {
			return item;
		}

		valueMap.current.set(item.props.value, item.props.name);

		return React.cloneElement(item, {
			...item.props,
			multiple,
			onClick: () => { onClick(item.props.value); closeMenu(); },
			values,
		});
	});

	return (
		<>
			<SelectInput
				toggleDropdown={onMenuOpen}
				multiple={multiple}
				title={title}
				values={values}
				valueMap={valueMap} />

			<Menu {...menuProps}>
				<div>
					{search && <SelectSearch onSearch={onSearch!} searchAsOption={searchAsOption!} onAddItem={onAddItem!} />}
					{search && searching && <Spinner size={25} />}
					{search && !searching && !childs.length && <p style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: 5 }}> No results </p>}
				</div>

				{!searching && childs}
			</Menu>
		</>
	);
};

Select.defaultProps = {
	searchAsOption: false,
	onChange: () => { /* */ },
	onSearch: () => { /* */ },
	onAddItem: () => { /* */ },
};
