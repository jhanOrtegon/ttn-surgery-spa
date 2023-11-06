import { useMutation } from '@tanstack/react-query';

import { HTTP_MEDICAL } from '@/config/axios';

import { type ICreateImportanceMutation } from './types';

import { useHandleMutationStatus } from '@/hooks';

import { customAlertError, customAlertSuccess } from '@/utils';

import { type IErrorResponse } from '@/types';

const createImportance = async (importance: ICreateImportanceMutation) => {
	const { data } = await HTTP_MEDICAL.post('/markups/', importance);
	return data;
};

export const useCreateImportance = (
	importance: ICreateImportanceMutation,
	onSuccess: () => void,
) => {
	const mutation = useMutation({
		mutationFn: async () => await createImportance(importance),
		onSuccess: res => {
			void customAlertSuccess({
				title: 'Creado exitosamente',
				message: `Se ha creado la importancia: ${importance.description}`,
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
