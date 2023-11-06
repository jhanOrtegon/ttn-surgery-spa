import { useMutation } from '@tanstack/react-query';

import { HTTP_MEDICAL } from '@/config/axios';

import { type ICreateCommentMutation } from './types';

import { useHandleMutationStatus } from '@/hooks';

import { customAlertError, customAlertSuccess } from '@/utils';

import { type IErrorResponse } from '@/types';

const createComment = async (comment: ICreateCommentMutation) => {
	const { data } = await HTTP_MEDICAL.post('/comments/', comment);
	return data;
};

export const useCreateComment = (comment: ICreateCommentMutation, onSuccess: () => void) => {
	const mutation = useMutation({
		mutationFn: async () => await createComment(comment),
		onSuccess: res => {
			void customAlertSuccess({
				title: 'Creado exitosamente',
				message: `Se ha creado la nota: ${comment.comment}`,
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
