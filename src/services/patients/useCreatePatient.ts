import { useMutation } from '@tanstack/react-query';

import { HTTP_MEDICAL } from '@/config/axios';

import { type IPatientMutation } from './types';

import { useHandleMutationStatus } from '@/hooks';

import { customAlertError, customAlertSuccess } from '@/utils';

import { type IErrorResponse } from '@/types';

const updatePatient = async (patient: IPatientMutation) => {
	const { data } = await HTTP_MEDICAL.post('/patient/register/', patient);
	return data;
};

export const useCreatePatient = (patient: IPatientMutation, onSuccess: () => void) => {
	const mutation = useMutation({
		mutationFn: async () => await updatePatient(patient),
		onSuccess: res => {
			void customAlertSuccess({
				title: 'Creado exitosamente',
				message: `Se ha creado el paciente: ${patient.firstName} ${patient.lastName}`,
			}).then(onSuccess);
		},

		onError: err => {
			const { response } = err as IErrorResponse;
			void customAlertError({ message: response?.data?.message });
		},
	});

	useHandleMutationStatus(mutation);

	return mutation;
};
