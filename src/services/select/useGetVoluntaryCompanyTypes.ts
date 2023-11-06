import { type IVoluntaryCompanyType } from '@/types';

import { addSelectionar } from '@/utils';

export const useGetVoluntaryCompanyTypes = () => {
	const voluntaryCompanyTypes: IVoluntaryCompanyType[] = [
		{ value: 'prepaid', label: 'Prepagada' },
		{ value: 'special_agreement', label: 'Convenio especial' },
	];

	addSelectionar(voluntaryCompanyTypes);

	return { data: voluntaryCompanyTypes };
};
