import { Input, type InputProps } from '@nextui-org/react';

const classNamesInputDisabled = {
	label: 'text-secondary font-bold text-md',
	input: ['outline-0', 'text-zinc-600'],
	innerWrapper: 'bg-transparent outline-0',
	inputWrapper: ['bg-secondary-10', 'border-secondary-20 border-1', 'focus-visible:outline-0'],
};

const classNamesInput = {
	label: 'text-secondary font-bold text-md',
	input: ['outline-0', 'text-zinc-600'],
	innerWrapper: 'bg-transparent outline-0',
	inputWrapper: [
		'group-data-[hover=true]:border-secondary-40',
		'group-data-[focus=true]:border-secondary-40',
		'bg-white',
		'border-secondary-20 border-1',
		'hover:border-secondary-40',
		'focus-visible:outline-0',
	],
};

const classNamesInputInvalid = {
	label: 'text-secondary font-bold text-md',
	input: ['outline-0', 'text-zinc-600'],
	innerWrapper: 'bg-primary outline-0',
	inputWrapper: [
		'group-data-[hover=true]:border-danger',
		'group-data-[focus=true]:border-danger',
		'bg-secondary-10',
		'border-danger border-1',
		'hover:border-danger',
		'focus-visible:outline-0',
	],
};

export const CustomInput = (props: InputProps) => {
	return (
		<Input
			{...props}
			autoComplete='off'
			placeholder='Escribir...'
			labelPlacement='outside'
			variant={props.variant || 'bordered'}
			radius='lg'
			classNames={
				props.isInvalid && props.disabled
					? classNamesInputInvalid
					: props.disabled
					? classNamesInputDisabled
					: classNamesInput
			}
		/>
	);
};
