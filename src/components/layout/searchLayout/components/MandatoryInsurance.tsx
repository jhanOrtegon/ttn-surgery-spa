// types
import { type IContract } from '@/types';

import { Text } from '@/components/ui';
import { Input } from '@nextui-org/react';

interface IMandatoryInsurance {
	data: IContract;
}

const classNamesInput = {
	label: 'text-secondary font-bold text-md',
	input: ['outline-0', 'text-zinc-600'],
	innerWrapper: 'bg-transparent outline-0',
	inputWrapper: [
		'bg-secondary-10',
		'border-secondary-20 border-1',
		'hover:border-secondary',
		'focus-visible:outline-0',
	],
};

export const MandatoryInsurance = ({ data }: IMandatoryInsurance) => {
	return (
		<div className='bg-primary-10 border-primary border-1 py-3 px-4 rounded-md shadow-sm mt-6'>
			<Text value='Aseguradora obligatoria' variant='subTitle' color='primary' className='mb-2' />

			<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
				<Input
					disabled
					type='text'
					label='Empresa'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.corporateClient || '-'}
					classNames={classNamesInput}
				/>

				<Input
					disabled
					type='text'
					label='Contrato'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.contractName || '-'}
					classNames={classNamesInput}
				/>

				<Input
					disabled
					type='text'
					label='Población'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.population || '-'}
					classNames={classNamesInput}
				/>

				<Input
					disabled
					type='text'
					label='Grupo de ingreso'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.crtName || '-'}
					classNames={classNamesInput}
				/>
			</div>
		</div>
	);
};
