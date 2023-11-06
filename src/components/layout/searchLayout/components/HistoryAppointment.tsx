import React, { useState } from 'react';

// utils
import { capitalizeEachWord } from '@/utils';

// icons
import { IconSearch } from '@tabler/icons-react';

// types
import { type IAppointment } from '@/types';

// components
import { DetailAppointment } from './DetailAppointment';
import { CustomChip, CustomTable, Text } from '@/components/ui';

interface IListAppointment {
	rowTotal: number;
	listAppointment?: IAppointment[];
	onChangeGetAppointmentsFilters: (filers: { page: number }) => void;
}

type TAppointmentStatus =
	| 'pending_attention'
	| 'attended'
	| 'partial_attention'
	| 'pending_payment'
	| 'failed'
	| 'cancelled'
	| 'pending_validation';

interface IInitialStateSelectedAppointment {
	isOpen: boolean;
	appointment: IAppointment;
}

const initialStateSelectedAppointment: IInitialStateSelectedAppointment = {
	isOpen: false,
	appointment: {},
};

export const HistoryAppointment = ({
	rowTotal,
	listAppointment,
	onChangeGetAppointmentsFilters,
}: IListAppointment) => {
	const [selectedAppointment, setSelectedAppointment] = useState<IInitialStateSelectedAppointment>(
		initialStateSelectedAppointment,
	);

	const { isOpen, appointment } = selectedAppointment;

	const renderStatus = (statusLabel: TAppointmentStatus, value: string) => {
		let color: 'gray' | 'success' | 'warning' | 'secondary' = 'gray';

		if (statusLabel === 'attended') color = 'success';
		if (statusLabel === 'failed') color = 'gray';

		return <CustomChip value={value} color={color} />;
	};

	const rows = React.useMemo(
		() =>
			listAppointment?.map(appoint => ({
				dateApp: appoint?.dateApp,
				serviceName: capitalizeEachWord(appoint?.serviceName || '-'),
				status: renderStatus(appoint?.statusValue as TAppointmentStatus, appoint.status!),
				statusClassName: 'text-center',
				dateAppClassName: 'text-center',
				detail: (
					<IconSearch
						size='16'
						className='text-secondary cursor-pointer'
						strokeWidth={3}
						onClick={() => {
							setSelectedAppointment(state => ({
								...state,
								isOpen: true,
								appointment: appoint,
							}));
						}}
					/>
				),
			})),
		[listAppointment],
	);

	const onCloseDetail = () => setSelectedAppointment(initialStateSelectedAppointment);

	return (
		<>
			<div className='mt-4'>
				<Text value='Historial de citas' color='primary' variant='subTitle' className='mb-2' />
				<CustomTable
					ariaLabel='Historial de citas'
					rowsTotal={rowTotal}
					rows={rows}
					columns={[
						{ key: 'dateApp', label: 'Fecha', className: 'text-center' },
						{ key: 'serviceName', label: 'Servicio' },
						{ key: 'status', label: 'Estado', className: 'text-center' },
						{ key: 'detail', label: '' },
					]}
					pagination={{
						perpage: 10,
						onChangePage: page => onChangeGetAppointmentsFilters({ page }),
					}}
				/>
			</div>

			<DetailAppointment isOpen={isOpen} onClose={onCloseDetail} appointment={appointment} />
		</>
	);
};
