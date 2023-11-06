// types
import { type IContract } from '@/types';

// components
import { Text } from '@/components/ui';
import { Input } from '@nextui-org/react';

interface IVoluntaryInsurer {
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

export const VoluntaryInsurer = ({ data }: IVoluntaryInsurer) => {
	return (
		<div className='bg-secondary-30 border-secondary border-1 py-3 px-4 rounded-md shadow-sm mt-6'>
			<Text value='Aseguradora voluntaria' variant='subTitle' color='secondary' className='mb-2' />

			<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
				<Input
					disabled
					type='text'
					label='Tipo'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.companyTypeName || '-'}
					classNames={classNamesInput}
				/>

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
					value={data?.contractDescription || '-'}
					classNames={classNamesInput}
				/>

				<Input
					disabled
					type='text'
					label='No. Póliza'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={data?.companyTypeTag === 'special_agreement' ? data?.population : '-'}
					classNames={classNamesInput}
				/>
			</div>
		</div>
	);
};
