import { type IMaritalStatus } from '@/types';

import { addSelectionar } from '@/utils';

export const useGetMaritalStatus = () => {
	const listMaritalStatus: IMaritalStatus[] = [
		{ label: 'Soltero(a)', value: 'single' },
		{ label: 'Casado(a)', value: 'married' },
		{ label: 'Divorciado(a)', value: 'divorced' },
		{ label: 'Viudo(a)', value: 'widowed' },
		{ label: 'Unión libre', value: 'freeunion' },
	];

	addSelectionar(listMaritalStatus);

	return { data: listMaritalStatus };
};
