import * as React from 'react';

export interface ISliderProps {
	/** Whether the slider is disabled */
	disabled?: boolean;

	/** The minimum value */
	min?: number;

	/** The maximum value */
	max?: number;

	/** The step value */
	step?: number;

	/** The value of the slider */
	value?: number;

	/** The event handler for the slider */
	onChange?(value: number): void;
}

/**
 * Display a range slider
 */
export const Slider: React.FC<ISliderProps> = (props: ISliderProps) => {
	const {
		min,
		max,
		value,
		step,
		disabled,
		onChange,
	} = props;

	const [sliderValue, setSliderValue] = React.useState(value);

	const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSliderValue(+e.target.value);

		if (onChange) {
			onChange(+e.target.value);
		}
	};

	return (
		<div className="jar-slider">
			<input
				className="jar-slider__input"
				type="range"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={sliderValue}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				value={sliderValue}
				onChange={change} />
		</div>
	);
};

Slider.defaultProps = {
	value: 0,
	disabled: false,
	max: 100,
	min: 0,
	step: 1,
};
