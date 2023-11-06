// utils
import { hasData } from '@/utils';

// store
import { useDataPersistent } from '@/store';

// hooks
import { useEffect, useState } from 'react';

// types
import { type IImportance } from '@/types';

// services
import { useGetImportances } from '@/services';

// components
import { IconWrapper } from './IconWrapper';
import { Close, CustomSelect, IconAlert, Text } from '@/components/ui';
import {
	Button,
	Listbox,
	ListboxItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';

interface INotes {
	isOpen: boolean;
	type: 'EDIT' | 'CREATE';
	onClose?: () => void;
}

export const ImportanceAdmin = ({ isOpen, onClose, type }: INotes) => {
	//= ================================ =//
	//= ========== 🚀 states ========== =//
	//= ================================ =//

	const { dataBiowel } = useDataPersistent();

	const { idAccount } = dataBiowel;

	const [listSelectedImportance, setListSelectedImportance] = useState<IImportance[]>([]);

	const [listImportance, setListImportance] = useState<IImportance[]>([]);

	const [touch, setTouch] = useState<boolean>(false);

	//= ================================ =//
	//= ========== 🤯 hooks ========== =//
	//= ================================ =//

	const { data: importances } = useGetImportances({ eaccount: idAccount });

	// const createComment = useCreateImportance({description:},
	//     () => {
	//         if (onClose) {
	//             resetForm();
	//             onClose();
	//         }
	//     },
	// );

	//= ================================ =//
	//= ========== 🤖 Effects ========== =//
	//= ================================ =//

	useEffect(() => {
		if (importances?.data.length) {
			setListImportance(importances?.data);
		}
	}, [importances]);

	//= ================================ =//
	//= ========== 😈 actions ========== =//
	//= ================================ =//

	const addImportance = (newImportance: IImportance) => {
		const addImportance = listSelectedImportance?.length
			? [...listSelectedImportance, newImportance]
			: [newImportance];

		const deleteImportance = listImportance?.filter(
			importance => importance.id !== newImportance.id,
		);

		setListSelectedImportance(addImportance);

		setListImportance(deleteImportance);
	};

	const deleteImportance = (id: number) => {
		const deleteImportance = listSelectedImportance.filter(importance => importance.id !== id);

		const newImportance: IImportance = importances?.data?.find(importance => importance.id === id)!;

		const addImportance = listImportance?.length
			? [...listImportance, newImportance]
			: [newImportance];

		setListSelectedImportance(deleteImportance);

		setListImportance(addImportance);
	};

	const handleClose = () => {
		setTouch(false);
		setListSelectedImportance([]);
		onClose?.();
	};

	// const handleSubmit = () =>{
	//     if(listSelectedImportance.length){
	//         alert('todo bien')
	//     }
	// }

	//= ================================ =//
	//= ========== 👻 Component ======= =//
	//= ================================ =//

	return (
		<Modal scrollBehavior={'inside'} isOpen={isOpen} onClose={handleClose} size='sm'>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='grid'>
							<Text
								className='mb-4 text-center'
								value={`${
									type === 'CREATE' ? 'Crear' : 'Editar'
								} tipo de importancia administrativa`}
								color='primary'
								font='bold'
								variant='subTitle'
							/>

							<CustomSelect
								className='font-normal'
								label=''
								name='docTypeId'
								options={listImportance}
								onBlur={() => setTouch(true)}
								errorMessage={touch && !listSelectedImportance.length ? 'Requerido' : ''}
								isInvalid={touch && !listSelectedImportance.length}
								onChange={(e: any) => {
									if (hasData(e.value)) {
										addImportance(e);
									}
								}}
							/>
						</ModalHeader>

						<ModalBody>
							<Listbox
								aria-label='User Menu'
								onAction={id => deleteImportance(Number(id))}
								className='p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium'
								itemClasses={{
									base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
								}}
							>
								{listSelectedImportance?.map(importance => (
									<ListboxItem
										key={importance.id}
										endContent={<Close isBlock color='gray' size={17} onClick={() => {}} />}
										startContent={
											<IconWrapper className='bg-danger/10'>
												<IconAlert size={20} isDisabled />
											</IconWrapper>
										}
									>
										{importance.label || '-'}
									</ListboxItem>
								))}
							</Listbox>
						</ModalBody>

						<ModalFooter className='flex gap-4 justify-center items-center'>
							<Button color='primary' variant='ghost' onPress={handleClose}>
								cancelar
							</Button>

							<Button color='primary' onPress={handleClose}>
								Guardar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
