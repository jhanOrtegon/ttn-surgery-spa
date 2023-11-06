import { type IBloodType } from '@/types';

import { addSelectionar } from '@/utils';

export const useGetBloodTypes = () => {
	const listBloodType: IBloodType[] = [
		{ label: 'A+', value: 'A+' },
		{ label: 'A-', value: 'A-' },
		{ label: 'B+', value: 'B+' },
		{ label: 'B-', value: 'B-' },
		{ label: 'AB+', value: 'AB+' },
		{ label: 'AB-', value: 'AB-' },
		{ label: 'O+', value: 'O+' },
		{ label: 'O-', value: 'O-' },
	];

	addSelectionar(listBloodType);

	return { data: listBloodType };
};
