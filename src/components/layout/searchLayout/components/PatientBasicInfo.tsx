import { type IPatient } from '@/types';
import { Button, Input } from '@nextui-org/react';

interface IPatientBasicInfo {
	patient?: IPatient;
	assignAppointment: () => void;
	onDetailPatient: (isActive: boolean) => void;
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

export const PatientBasicInfo = ({
	patient,
	onDetailPatient,
	assignAppointment,
}: IPatientBasicInfo) => {
	if (!patient) {
		return <></>;
	}

	return (
		<div className='flex flex-col gap-3'>
			<Input
				disabled
				type='text'
				label='Identificación del paciente'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.document}
				classNames={classNamesInput}
			/>

			<Input
				disabled
				type='text'
				label='Primer nombre'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.firstName}
				classNames={classNamesInput}
			/>

			<Input
				disabled
				type='text'
				label='Primer Apellido'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.lastName}
				classNames={classNamesInput}
			/>

			<Input
				disabled
				type='text'
				label='Fecha de nacimiento'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.birthDate}
				classNames={classNamesInput}
			/>
			<Input
				disabled
				type='text'
				label='WhatsApp'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.whatsapp}
				classNames={classNamesInput}
			/>

			<Input
				disabled
				type='text'
				label='Correo electrónico'
				placeholder='Escribir...'
				labelPlacement='outside'
				variant='bordered'
				radius='lg'
				value={patient?.email}
				classNames={classNamesInput}
			/>

			<Button
				className='mt-2 hover:bg-secondary bg-primary text-white font-bold rounded-md text-md duration-300 ease-in-out'
				onClick={assignAppointment}
			>
				Asignar cita
			</Button>
			<Button
				className='bg-white border-secondary border-1 hover:border-0 text-secondary font-bold rounded-md text-md hover:bg-primary hover:text-white duration-300 ease-in-out'
				onClick={() => onDetailPatient(true)}
			>
				Detalle del paciente
			</Button>
		</div>
	);
};
