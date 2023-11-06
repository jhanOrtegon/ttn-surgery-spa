import React from 'react';
import Select from 'react-select';
import { useField } from 'formik';

interface IFormikReactSelect {
	label: string;
	name: string;
	options: Array<{ value: any; label: string }>;
	isMulti?: boolean;
}

export const FormikReactSelect: React.FC<IFormikReactSelect> = ({
	label,
	options,
	isMulti,
	...props
}) => {
	const [field, meta] = useField(props);
	const selectStyles = {
		control: (styles: any) => ({
			...styles,
			width: '100%',
		}),
	};

	return (
		<div>
			<label htmlFor={props.name}>{label}</label>
			<Select
				{...field}
				{...props}
				options={options}
				isMulti={isMulti}
				styles={selectStyles}
				onChange={option => field.onChange({ target: { name: props.name, value: option } })}
				onBlur={() => field.onBlur({ target: { name: props.name } })}
			/>
			{meta.touched && meta.error && <div className='error'>{meta.error}</div>}
		</div>
	);
};
