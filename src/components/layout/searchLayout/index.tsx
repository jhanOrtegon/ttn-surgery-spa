'use client';

import React, { useState, type FC, useEffect } from 'react';

// Icons
import { IconAlertCircle, IconX, IconReportMedical, IconArrowLeft } from '@tabler/icons-react';

// styles
import styles from './style.module.scss';

// hooks
import { useDataPersistent } from '@/store';

// types
import { type ISearchLayout, type TAction } from './types';
import { type IOrder, type IContract, type IPatient } from '@/types';

// Services
import {
	useGetInfoPatient,
	useGetPatients,
	useGetAppointments,
	useGetPendingOrders,
} from '@/services';

// components
import { OrderPendingCard, Text, Notes, ImportanceAdmin, InsuranceCard } from '@/components/ui';
import { ScrollShadow, Image } from '@nextui-org/react';
import {
	BoxSearch,
	ListPatient,
	PatientBasicInfo,
	PatientBasicInfoHeader,
	PatientCreate,
	PatientDetail,
	PatientDetailActions,
	PatientEdit,
} from './components';

import { nanoid } from 'nanoid';
import { hasData } from '@/utils';

const initialDataPatient = {
	active: false,
	data: { id: 0 },
};

export const SearchLayout: FC<ISearchLayout> = ({
	children,
	title,
	onBack = true,
	hasBody = true,
}) => {
	//= ================================ =//
	//= ========== 🚀 states ========== =//
	//= ================================ =//

	const { dataBiowel } = useDataPersistent();

	const { idAccount } = dataBiowel;

	const [filters, setFilters] = useState({
		getPatientsFilters: {
			page: 1,
			perpage: 100,
			orderByType: 'creation',
		},
		getAppointmentsFilters: {
			perpage: 10,
			page: 1,
		},
	});

	const [patient, setPatient] = useState<{ active: boolean; data: IPatient }>(initialDataPatient);

	const [isOpenNotes, setIsOpenNotes] = useState<boolean>(false);

	const [isOpenImportanceAdmin, setIsOpenImportanceAdmin] = useState<boolean>(false);

	const [, setIsOpenImportanceAsis] = useState<boolean>(false);

	const [countNotes, setCountNotes] = useState<number>(0);

	const [showComponentAction, setShowComponentAction] = useState<TAction>('DETAIL');

	const { getPatientsFilters, getAppointmentsFilters } = filters;

	const [search, setSearch] = useState<string>('');

	const [isActiveDetailPatient, setIsActiveDetailPatient] = useState<boolean>(false);

	//= ========== states the insurances ========== =//
	const [listInsuranceRequired, setListInsuranceRequired] = useState<IContract[]>([]);
	const [listInsuranceOptional, setListInsuranceOptional] = useState<IContract[]>([]);

	const [, setOrderSelected] = useState<IOrder>();

	const [insuranceSelected, setInsuranceSelected] = useState<{
		isShow: boolean;
		insurance?: IContract;
	}>({ isShow: false });

	//= ================================ =//
	//= ========== 🤯 hooks ========== =//
	//= ================================ =//

	const { data: pendingOrders } = useGetPendingOrders(
		{ patient: patient.data.id, typeList: 'orderPend' },
		patient.active && !isActiveDetailPatient,
	);

	const { data: allPatients } = useGetPatients(getPatientsFilters);

	const { data: infoPatient } = useGetInfoPatient(
		{ id: patient.data.id, eaccount: idAccount },
		patient.active,
	);

	const { data: listAppointment } = useGetAppointments(
		{ idPatient: patient.data.id, ...getAppointmentsFilters },
		isActiveDetailPatient,
	);

	//= ================================ =//
	//= ========== 🤖 Effects ========== =//
	//= ================================ =//

	useEffect(() => {
		if (infoPatient?.results?.contracts?.length) {
			const listInsurance = infoPatient?.results;
			setListInsuranceOptional(
				listInsurance?.contracts?.filter(insurance => insurance.isMain === 0) || [],
			);
			setListInsuranceRequired(
				listInsurance?.contracts?.filter(insurance => insurance.isMain === 1) || [],
			);
		}
	}, [infoPatient]);

	//= ================================ =//
	//= ========== 😈 actions ========== =//
	//= ================================ =//

	const handleChangeSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(target.value);
	};

	const handleChangeComponent = (action: TAction) => {
		if (action === 'NOTE') setIsOpenNotes(true);

		if (action === 'IMPORTANCE_ADMIN') setIsOpenImportanceAdmin(true);

		if (action === 'IMPORTANCE_ASIS') setIsOpenImportanceAsis(true);

		if (['CREATE', 'DETAIL', 'EDIT'].includes(action)) {
			setShowComponentAction(action);
		}
	};

	const handleSelectedPatient = ({ active, data }: { active: boolean; data: IPatient }) => {
		setPatient({ active, data });
	};

	const handleActivePatient = (isActive: boolean) => {
		setShowComponentAction('DETAIL');
		setIsActiveDetailPatient(isActive);
	};

	const handleSearch = () => {
		setFilters(state => ({
			...state,
			getPatientsFilters: {
				...state.getPatientsFilters,
				filterPatient: search,
			},
		}));
	};

	const handleBackPatientBasicInfoHeader = () => {
		setSearch('');
		setPatient(initialDataPatient);
		setInsuranceSelected({ isShow: false });
		setOrderSelected({});
		setListInsuranceOptional([]);
		setListInsuranceRequired([]);
		setFilters(state => ({
			...state,
			getPatientsFilters: {
				page: 1,
				perpage: 100,
				orderByType: 'creation',
			},
		}));
	};

	const onChangeGetAppointmentsFilters = (filters: { page: number }) => {
		setFilters(state => ({
			...state,
			getAppointmentsFilters: { ...state.getAppointmentsFilters, ...filters },
		}));
	};

	const onBackHome = () => {
		setIsActiveDetailPatient(false);
		setIsActiveDetailPatient(false);
		setSearch('');
		setShowComponentAction('DETAIL');
		setPatient(initialDataPatient);
		setFilters(state => ({
			...state,
			getPatientsFilters: {
				page: 1,
				perpage: 100,
				orderByType: 'creation',
			},
		}));
	};

	//= ================================ =//
	//= ========== 👻 Component ======= =//
	//= ================================ =//

	return (
		<>
			<div
				className={`${styles.boxSearchLayout} ${
					isActiveDetailPatient ? 'grid-cols-[550px_1fr]' : 'grid-cols-[330px_1fr]'
				} `}
			>
				<div className={`${styles.boxSidebarSearch} relative`}>
					<div className={`pt-10 px-10 ${isActiveDetailPatient ? 'pb-10' : ''}`}>
						{isActiveDetailPatient && (
							<IconX
								className='text-zinc-300 hover:text-primary duration-400 ease-in-out cursor-pointer absolute right-10 top-2'
								strokeWidth={3}
								size={25}
								onClick={() => handleActivePatient(showComponentAction === 'EDIT')}
							/>
						)}

						<Text
							value={
								isActiveDetailPatient
									? `${
											showComponentAction !== 'EDIT' && showComponentAction !== 'CREATE'
												? 'Detalle del paciente'
												: showComponentAction === 'CREATE'
												? 'Crear paciente'
												: 'Editar paciente'
									  }`
									: title
							}
							variant='title'
							color='secondary'
							className='mb-4'
						/>

						{showComponentAction === 'CREATE' && (
							<PatientCreate className='mt-6' onBack={onBackHome} />
						)}

						{!patient.active && !isActiveDetailPatient && (
							<BoxSearch
								search={search}
								handleChange={handleChangeSearch}
								onSearch={handleSearch}
								onAddPatient={() => {
									handleChangeComponent('CREATE');
									setIsActiveDetailPatient(true);
								}}
							/>
						)}

						{patient.active && !isActiveDetailPatient && (
							<PatientBasicInfoHeader
								totalNotes={countNotes}
								onBack={handleBackPatientBasicInfoHeader}
								onClickAction={action => handleChangeComponent(action)}
							/>
						)}

						{patient.active && !isActiveDetailPatient && (
							<PatientBasicInfo
								patient={infoPatient?.results}
								assignAppointment={() => setInsuranceSelected({ isShow: true })}
								onDetailPatient={handleActivePatient}
							/>
						)}

						{isActiveDetailPatient && (
							<>
								{showComponentAction !== 'CREATE' && (
									<PatientDetailActions
										className='mb-4'
										totalNotes={countNotes}
										hideEdit={showComponentAction === 'EDIT'}
										onClickAction={action => handleChangeComponent(action)}
									/>
								)}

								{showComponentAction !== 'EDIT' && showComponentAction !== 'CREATE' && (
									<PatientDetail
										onChangeGetAppointmentsFilters={onChangeGetAppointmentsFilters}
										listAppointment={listAppointment}
										patient={infoPatient?.results}
										onBack={handleBackPatientBasicInfoHeader}
									/>
								)}

								{showComponentAction === 'EDIT' && (
									<PatientEdit patient={infoPatient?.results} onBack={onBackHome} />
								)}
							</>
						)}
					</div>

					{hasBody && !patient.active && !isActiveDetailPatient && (
						<div>
							<ScrollShadow hideScrollBar className='h-[43vh]'>
								<ListPatient
									onSelectedPatient={handleSelectedPatient}
									listPatient={allPatients?.results!}
								/>
								{allPatients?.results?.length! <= 0 && (
									<div className='px-10 mb-2 flex flex-col items-center mt-12'>
										<IconAlertCircle className='text-danger-50 mb-2' size={35} />
										<div className='p-3 text-white bg-danger-50 rounded-md font-bold text-center w-full'>
											Paciente no encontrado
										</div>
									</div>
								)}
							</ScrollShadow>

							{allPatients?.results?.length! > 5 && (
								<div className='py-2 px-4 text-sm text-zinc-500'>
									{`(${allPatients?.results?.length}) resultados`}
								</div>
							)}

							<div className='absolute bottom-3 left-10'>
								<Image
									isBlurred
									src='https://ttntest.biowel.com.co/static/media/img_appointment.b57c969c.svg'
									alt='Generar cotización'
								/>
							</div>
						</div>
					)}
				</div>

				<div className={`${styles.boxSearchLayoutMain} relative`}>
					{!insuranceSelected.isShow && !isActiveDetailPatient && (
						<>
							<div>
								{hasData(pendingOrders?.results?.length) && (
									<div className='flex gap-4 items-end mb-6'>
										<IconReportMedical className='text-secondary' strokeWidth={2} size={35} />
										<Text value='Ordenamientos' color='secondary' variant='title' font='bold' />
									</div>
								)}
							</div>

							{pendingOrders?.results?.map(order => (
								<OrderPendingCard
									key={nanoid()}
									title={order?.offeredService || '-'}
									dataOrder={order}
									onClick={() => {
										setInsuranceSelected({ isShow: true });
										setOrderSelected(order);
									}}
								/>
							))}

							{!pendingOrders?.results?.length && patient.active && (
								<div className='text-zinc-500 font-bold text-2xl'>
									El paciente seleccionado no tiene eventos
								</div>
							)}
						</>
					)}

					{insuranceSelected.isShow && !isActiveDetailPatient && (
						<>
							<div className='flex gap-x-3'>
								<IconArrowLeft
									className='cursor-pointer text-cyan-500 absolute left-11'
									height={40}
									strokeWidth={3}
									width={40}
									onClick={() => {
										setInsuranceSelected({ isShow: false });
									}}
								/>
								<Text value='Empresas clientes' color='secondary' variant='title' font='bold' />
							</div>

							{listInsuranceRequired?.map(insurance => (
								<InsuranceCard
									key={nanoid()}
									type={'Aseguradora obligatoria'}
									dataInsurance={insurance}
									onClick={() => {
										setInsuranceSelected({ isShow: true, insurance });
									}}
								/>
							))}

							{listInsuranceOptional?.map(insurance => (
								<InsuranceCard
									key={nanoid()}
									type={'Aseguradora voluntaria'}
									dataInsurance={insurance}
									onClick={() => {
										setInsuranceSelected({ isShow: true, insurance });
									}}
								/>
							))}

							{!listInsuranceRequired?.length && !listInsuranceOptional?.length && (
								<div className='text-zinc-500 font-bold text-2xl mt-4'>
									El paciente seleccionado no tiene aseguradoras
								</div>
							)}
						</>
					)}
				</div>
			</div>

			<Notes
				open={isOpenNotes}
				patientId={patient?.data?.id!}
				onClose={() => setIsOpenNotes(false)}
				countNotes={countNotes => setCountNotes(countNotes)}
				patientName={`${patient?.data?.firstName} ${patient?.data?.lastName}`}
			/>

			<ImportanceAdmin
				type='CREATE'
				isOpen={isOpenImportanceAdmin}
				onClose={() => setIsOpenImportanceAdmin(false)}
			/>
		</>
	);
};
