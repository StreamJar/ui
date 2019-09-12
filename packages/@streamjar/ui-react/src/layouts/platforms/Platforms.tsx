import * as React from 'react';
import { Checkbox } from '../../components/form/checkbox';
import { PlatformBrands, JAR_SUPPORTED_PLATFORMS } from '../../constants';

export interface IPlatformsProps {
	/** Enabled and configured platforms */
	platforms: string[];

	/** The current value */
	value?: string[];

	/** The changed hook */
	onChange?(platforms: string[]): void;
}

export const Platforms: React.FC<IPlatformsProps> = (props: IPlatformsProps) => {
	const { value, onChange, platforms } = props;

	const [all, setAll] = React.useState(true);
	const [enabledPlatforms, setEnabledPlatforms] = React.useState(value || platforms);

	React.useEffect(() => {
		if (value) {
			const val = value.filter(i => platforms.indexOf(i) !== -1);

			setAll(val.length === platforms.length);
			setEnabledPlatforms(val);

			return;
		}

		setAll(true);
		setEnabledPlatforms(platforms);
	},              [value]);

	const toggleAll = (v: boolean) => {
		if (!v) {
			setAll(false);
		} else {
			setAll(true);
			setEnabledPlatforms(platforms);
			onChange!(platforms);
		}
	};

	const onChecked = (type: string): void =>  {
		let val = [...enabledPlatforms, type];

		if (enabledPlatforms.includes(type)) {
			val = enabledPlatforms.filter(i => i !== type);
		}

		onChange!(val);
		setEnabledPlatforms(val);
	};

	const disableAll = (val: boolean = false): void => {
		if (!val) {
			setAll(false);
		} else {
			onChange!(platforms);
			setAll(true);
			setEnabledPlatforms(platforms);
		}
	};

	const disableAllFalse = (): void => {
		disableAll(false);
	};

	const getPlatform = (name: string) => {
		const brand = PlatformBrands.has(name) ? PlatformBrands.get(name) : name;
		const last = enabledPlatforms.length === 1;

		return (
			<div key={name} onClick={disableAllFalse}>
				<Checkbox
					value={enabledPlatforms.includes(name)}
					colour={`platform-${name}` as JAR_SUPPORTED_PLATFORMS}
					onChange={onChecked.bind(null, name)} // tslint:disable-line
					disabled={enabledPlatforms.includes(name) && last}>
					{brand}
				</Checkbox>
			</div>
		);
	};

	return (
		<>
			<Checkbox value={all} onChange={toggleAll} colour="accent"> All </Checkbox>

			<hr style={{ border: '1px solid rgb(105, 76, 127)'}} />

			<div style={{ opacity: all ? 0.2 : 1 }}>
				{platforms.map(getPlatform)}
			</div>
		</>
	);
};

Platforms.defaultProps = {
	platforms: [],
	onChange: () => { /* */ },
}
