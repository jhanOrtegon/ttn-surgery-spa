import { hasData } from '@/utils';
import Select, { type Props as ReactSelectProps, type StylesConfig } from 'react-select';
interface ICustomSelect extends ReactSelectProps {
	label: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	errorMessage?: string | false;
}

interface ISelectOption {
	value: string;
	label: string;
}

export const CustomSelect = (props: ICustomSelect) => {
	const styleCustomSelect: StylesConfig = {
		option: (provided, state) => ({
			...provided,
			fontSize: 13,
			overflowX: 'hidden',
			backgroundColor: state.isDisabled
				? '#58595B'
				: state.isSelected
				? '#003F80'
				: state.isFocused
				? '#ccdce4'
				: '#fff',
			color: state.isDisabled || state.isSelected ? 'white' : '#58595B',
			cursor: state.isDisabled ? 'not-allowed' : 'default',

			':active': {
				backgroundColor: undefined,
			},
		}),
		menuPortal: base => ({ ...base, zIndex: 9999 }),
		control: (provided, state) => ({
			...provided,
			border: props.isInvalid ? '1px solid #f87171 ' : '1px solid  #A3BAD1',
			borderRadius: 5,
			height: 40,
			fontSize: 14,
			boxShadow: 'none',
			backgroundColor: state.isDisabled ? '#F5F7FA' : '#fff',
			'&:hover': {
				borderColor: props.isInvalid ? '#f87171' : '#2C75B2',
			},
		}),
		menu: (provided, state) => ({
			...provided,
			width: '100%',
			fontSize: '17px',
			marginTop: '4.8px',
			padding: 0,
			zIndex: 9000,
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			paddingTop: 0,
			paddingBottom: 0,
			color: props.isInvalid ? '#f87171' : props.isDisabled ? '#58595B' : '#003F80',
		}),
		clearIndicator: (provided, state) => ({
			...provided,
			paddingTop: 0,
			paddingBottom: 0,
			color: '#003F80',
		}),
		input: (provided, state) => ({
			...provided,
			margin: '0px',
		}),
		indicatorSeparator: state => ({
			display: 'none',
		}),

		singleValue: (provided, state) => {
			const transition = 'opacity 300ms';
			const color = '#58595B';
			return { ...provided, transition, color };
		},
	};

	const defaultValue = (options: ISelectOption[], value: string | number) => {
		return hasData(options)
			? options.find(option => option.value === value)
			: { label: 'Seleccionar...', value: '' };
	};

	return (
		<div>
			<div className='flex'>
				<p
					className={`mb-[0.375rem] text-secondary font-bold ${
						props?.isInvalid ? '!text-danger' : ''
					}`}
				>
					{props?.label}
				</p>
				{props?.isRequired && <div className='text-danger font-bold ml-[0.125rem]'>*</div>}
			</div>

			<Select
				{...props}
				value={
					defaultValue(props.options as any, props.value as string | number) || {
						label: 'Seleccionar...',
						value: '',
					}
				}
				styles={styleCustomSelect}
				noOptionsMessage={() => 'No hay datos'}
				placeholder={'Seleccionar...'}
				onBlur={props?.onBlur}
				onChange={props.onChange}
			/>

			{props?.errorMessage && <span className='text-tiny text-danger'>{props?.errorMessage}</span>}
		</div>
	);
};
