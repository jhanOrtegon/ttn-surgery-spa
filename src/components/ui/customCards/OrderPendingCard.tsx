import React from 'react';

// types
import { type IOrder } from '@/types';

// components
import { Card } from '@nextui-org/react';

interface IOrderPendingCard {
	title: string;
	dataOrder: IOrder;
	onClick: () => void;
}

export const OrderPendingCard = ({ title, dataOrder, onClick }: IOrderPendingCard) => {
	return (
		<div onClick={onClick}>
			<Card className='block my-6 w-full p-4 py-4 hover:bg-primary/10 hover:cursor-pointer duration-500 ease-in-out'>
				<div className='text-2xl font-bold text-secondary'>{title}</div>

				<div className='grid grid-cols-[230px_1fr] text-zinc-500 font-bold mt-2 gap-y-1'>
					<div>Validez</div>
					<div className={'text-zinc-600 font-normal'}>{dataOrder?.dateValidity || '-'}</div>

					<div>Fecha recomendada</div>
					<div className={'text-zinc-600 font-normal'}>{dataOrder?.dateSuggested || '-'}</div>

					<div>Observaciones</div>
					<div className={'text-zinc-600 font-normal truncate'}>
						{dataOrder?.observation || '-'}
					</div>
				</div>
			</Card>
		</div>
	);
};
