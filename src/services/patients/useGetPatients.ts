// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchPatients, type IResponseFetchPatients } from './types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchPatients = async (filters: IFiltersFetchPatients) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchPatients>('/patient/listPatient/', {
		params: filters,
	});
	return convertKeysToCamelCase(response.data);
};

export const useGetPatients = (filters: IFiltersFetchPatients, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['patients', filters] : ['patients'],
		queryFn: async () => await fetchPatients(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
