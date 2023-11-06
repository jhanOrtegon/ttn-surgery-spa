import { useMutation } from '@tanstack/react-query';

import { HTTP_MEDICAL } from '@/config/axios';

import { useHandleMutationStatus } from '@/hooks';

import { customAlertError, customAlertSuccess } from '@/utils';

import { type IErrorResponse } from '@/types';
import { type Dispatch, type SetStateAction, useEffect } from 'react';

interface IUseDeleteComment {
	id: number;
	onSuccess: () => void;
	enabled: {
		state: boolean;
		set: Dispatch<SetStateAction<boolean>>;
	};
}

const deleteComment = async (id: number) => {
	const { data } = await HTTP_MEDICAL.delete('/comments/', { data: { id } });
	return data;
};

export const useDeleteComment = ({ id, onSuccess, enabled: { state, set } }: IUseDeleteComment) => {
	const mutation = useMutation({
		mutationFn: async () => await deleteComment(id),

		onSuccess: res => {
			void customAlertSuccess({
				title: 'Actualizado exitosamente',
				message: `Se ha eliminado la nota de forma exitosa`,
			}).then(onSuccess);
		},

		onError: err => {
			const { response } = err as IErrorResponse;
			void customAlertError({ message: response?.data?.message });
		},

		onSettled: () => set(true),
	});

	useHandleMutationStatus(mutation);

	useEffect(() => {
		if (!state) {
			mutation.mutate();
		}
	}, [state]);

	return mutation;
};
