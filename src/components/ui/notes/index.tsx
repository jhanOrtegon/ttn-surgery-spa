// utils
import { nanoid } from 'nanoid';
import { capitalizeEachWord, customAlertWarning, hasData } from '@/utils';

// schemes
import { schemeCreateNote } from './scheme';

// store
import { useDataPersistent } from '@/store';

// icons
import { IconSend } from '@tabler/icons-react';

// hooks
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

// services
import { useCreateComment, useDeleteComment, useGetComments } from '@/services/comments';

// components
import { CustomDrawer, IconAlert } from '..';
import { CardNote } from './CardNote';
import { Card, CardBody, Textarea } from '@nextui-org/react';

interface INotes {
	open: boolean;
	patientId: number;
	patientName: string;
	onClose?: () => void;
	countNotes: (countNotes: number) => void;
}

export const Notes = ({ open, onClose, patientId, patientName, countNotes }: INotes) => {
	//= ================================ =//
	//= ========== 🚀 states ========== =//
	//= ================================ =//

	const { dataBiowel } = useDataPersistent();

	const { idAccount, idUser } = dataBiowel;

	const [commentSelected, setCommentSelected] = useState<number>(0);
	const [enabled, setEnabled] = useState<boolean>(true);

	const { handleChange, handleBlur, handleSubmit, values, touched, errors, resetForm } = useFormik({
		initialValues: {
			eaccount: idAccount,
			date: new Date(),
			comment: '',
			id: 0,
			userId: 0,
			userName: '',
		},
		validationSchema: schemeCreateNote,
		onSubmit: values => {
			createComment.mutate();
		},
	});

	//= ================================ =//
	//= ========== 🤯 hooks ========== =//
	//= ================================ =//

	const { data, refetch } = useGetComments({
		eaccount: idAccount,
		entity: 'userClient',
		id: patientId,
	});

	const createComment = useCreateComment(
		{
			...values,
			id: patientId,
			userId: idUser,
			entity: 'userClient',
		},
		() => {
			if (onClose) {
				resetForm();
				onClose();
			}
		},
	);

	useDeleteComment({
		id: commentSelected,
		enabled: { state: enabled, set: setEnabled },
		onSuccess: () => {
			if (onClose) {
				resetForm();
				onClose();
			}
		},
	});

	//= ================================ =//
	//= ========== 🤖 Effects ========== =//
	//= ================================ =//

	useEffect(() => {
		if (open) void refetch();
	}, [open]);

	useEffect(() => countNotes(data?.results.length || 0), [data]);

	//= ================================ =//
	//= ========== 😈 actions ========== =//
	//= ================================ =//

	const onDelete = (idComment: number, comment: string) => {
		void customAlertWarning({ message: `Se eliminara la nota: ${comment}` }).then(
			({ isConfirmed }) => {
				if (isConfirmed) {
					setEnabled(false);
					setCommentSelected(idComment);
				}
			},
		);
	};

	//= ================================ =//
	//= ========== 👻 Component ======= =//
	//= ================================ =//

	return (
		<CustomDrawer
			open={open}
			size={'xs'}
			direction='right'
			title='Notas'
			onClose={onClose}
			hasFooter={hasData(data?.results.length)}
			footer={
				<form noValidate onSubmit={handleSubmit}>
					<Card isBlurred shadow='sm' className='border-primary-20 border-1 rounded-lg'>
						<CardBody className='bg-primary-10 p-4 py-3'>
							<div className='text-primary '>{capitalizeEachWord(patientName)}</div>
							<Textarea
								name='comment'
								value={values.comment}
								errorMessage={touched.comment && errors?.comment}
								isInvalid={hasData(touched.comment && errors?.comment)}
								onChange={handleChange}
								onBlur={handleBlur}
								minRows={6}
								maxRows={8}
								variant='faded'
								labelPlacement='outside'
								placeholder='Escribir...'
								className='max-w-xs'
								classNames={{
									inputWrapper: [
										`bg-white data-hover ${errors.comment ? 'border-danger' : 'border-primary-20'}`,
										`${
											errors.comment
												? 'group-data-[hover=true]:border-danger'
												: 'group-data-[hover=true]:border-primary-40'
										}`,
									],
									input: ['text-zinc-500'],
								}}
							/>
							<button type='submit'>
								<IconSend
									className='mt-2 text-primary rotate-45 w-100 ml-auto cursor-pointer hover:scale-105'
									size={20}
									strokeWidth={2}
								/>
							</button>
						</CardBody>
					</Card>
				</form>
			}
		>
			{data?.results?.map(comment => <CardNote key={nanoid()} {...comment} onDelete={onDelete} />)}

			{!data?.results?.length && (
				<Card shadow='none' className='p-4 text-secondary'>
					<div className='flex items-center gap-4'>
						<IconAlert />
						<div>No se encontraron notas</div>
					</div>
				</Card>
			)}
		</CustomDrawer>
	);
};
