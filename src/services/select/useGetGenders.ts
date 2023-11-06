import { type IGender } from '@/types';
import { addSelectionar } from '@/utils';

export const useGetGenders = () => {
	const listGender: IGender[] = [
		{ label: 'Femenino', value: 'female' },
		{ label: 'Masculino', value: 'male' },
	];

	addSelectionar(listGender);

	return { data: listGender };
};
