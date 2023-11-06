// types
import { type IResponseFetchAppointments } from '@/services/appointments/types';
import { type IContract, type IPatient } from '@/types';

// utils
import { nanoid } from 'nanoid';

// components
import { CustomInput, Text } from '@/components/ui';
import { VoluntaryInsurer, MandatoryInsurance, HistoryAppointment } from '.';
import { useGetMaritalStatus, useGetGenders } from '@/services';

interface IPatientDetail {
	patient?: IPatient;
	listAppointment?: IResponseFetchAppointments;
	onBack: () => void;
	onChangeGetAppointmentsFilters: (filters: { page: number }) => void;
}

export const PatientDetail = ({
	onBack,
	patient,
	listAppointment,
	onChangeGetAppointmentsFilters,
}: IPatientDetail) => {
	const mandatoryInsurance = patient?.contracts?.filter((crt: IContract) => crt?.isMain === 1);

	const voluntaryInsurer = patient?.contracts?.filter((crt: IContract) => crt?.isMain === 0);

	const { data: genders } = useGetGenders();

	const { data: maritalStatusList } = useGetMaritalStatus();

	return (
		<div>
			<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
				<CustomInput
					disabled
					type='text'
					label='Tipo de documento'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.docType || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Número de documento'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.document || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Primer Nombre'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.firstName || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Segundo Nombre'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.otherNames || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Primer Apellido'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.lastName || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Segundo Apellido'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.secondSurname || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Fecha de nacimiento'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.birthDate || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Edad'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.age || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='WhatsApp'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.whatsapp || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Género'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={genders.find(gender => gender.value === patient?.gender)?.label || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Tipo de afiliado'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.affiliationTypeName || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Correo electrónico'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.email || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Estado civil'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={
						maritalStatusList?.find(marital => marital?.value === patient?.maritalStatus)?.label ||
						'-'
					}
				/>
			</div>

			<Text
				value='Información complementaria'
				variant='subTitle'
				color='primary'
				className='mt-4 mb-2'
			/>
			<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
				<CustomInput
					disabled
					type='text'
					label='Departamento'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.provinceName || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Municipio'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.cityName || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Dirección'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.homeAddress || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Grupo sanguíneo'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.bloodType || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Celular'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.cellphone || '-'}
				/>
				<CustomInput
					disabled
					type='text'
					label='Teléfono fijo'
					placeholder='Escribir...'
					labelPlacement='outside'
					variant='bordered'
					radius='lg'
					value={patient?.homephone || '-'}
				/>
			</div>

			{mandatoryInsurance?.map((crt: IContract) => (
				<MandatoryInsurance key={nanoid()} data={crt} />
			))}

			{voluntaryInsurer?.map((crt: IContract) => <VoluntaryInsurer key={nanoid()} data={crt} />)}

			<HistoryAppointment
				rowTotal={listAppointment?.rowTotal as number}
				listAppointment={listAppointment?.results}
				onChangeGetAppointmentsFilters={onChangeGetAppointmentsFilters}
			/>
		</div>
	);
};
