import React from 'react';

// types
import { type IContract } from '@/types';

// components
import { Card } from '@nextui-org/react';
import { capitalizeEachWord } from '@/utils';

interface IInsuranceCard {
	type: 'Aseguradora obligatoria' | 'Aseguradora voluntaria';
	dataInsurance: IContract;
	onClick: () => void;
}

export const InsuranceCard = ({ dataInsurance, onClick, type }: IInsuranceCard) => {
	if (type === 'Aseguradora obligatoria') {
		return (
			<div onClick={onClick}>
				<Card className='block my-6 w-full p-4 py-4 hover:bg-primary/10 hover:cursor-pointer duration-500 ease-in-out'>
					<div className='grid grid-cols-[230px_1fr] text-secondary font-bold mt-2 gap-y-1'>
						<div>
							{type}
							<span className='ml-1 text-danger'>*</span>
						</div>
						<div className={'text-zinc-500 font-normal'}>
							{capitalizeEachWord(dataInsurance?.corporateClient || '') || '-'}
						</div>

						<div>Contrato</div>
						<div className={'text-zinc-500 font-normal'}>
							{capitalizeEachWord(dataInsurance?.contractName || '') || '-'}
						</div>

						<div>Grupo de ingreso</div>
						<div className={'text-zinc-500 font-normal truncate'}>
							{capitalizeEachWord(dataInsurance?.crtName || '') || '-'}
						</div>

						<div>Población</div>
						<div className={'text-zinc-500 font-normal truncate'}>
							{capitalizeEachWord(dataInsurance?.population || '') || '-'}
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (type === 'Aseguradora voluntaria') {
		return (
			<div onClick={onClick}>
				<Card className='block my-6 w-full p-4 py-4 hover:bg-primary/10 hover:cursor-pointer duration-500 ease-in-out'>
					<div className='grid grid-cols-[230px_1fr] text-secondary font-bold mt-2 gap-y-1'>
						<div>{type}</div>
						<div className={'text-zinc-500 font-normal'}>
							{capitalizeEachWord(dataInsurance?.corporateClient || '') || '-'}
						</div>

						<div>Contrato</div>
						<div className={'text-zinc-500 font-normal'}>
							{capitalizeEachWord(dataInsurance?.contractName || '') || '-'}
						</div>

						<div>No. póliza</div>
						<div className={'text-zinc-500 font-normal truncate'}>
							{dataInsurance?.policy || '-'}
						</div>
					</div>
				</Card>
			</div>
		);
	}
};
