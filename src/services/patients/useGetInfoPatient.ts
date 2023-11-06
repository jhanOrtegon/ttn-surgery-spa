// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchInfoPatient, type IResponseFetchInfoPatient } from './types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchInfoPatient = async (filters: IFiltersFetchInfoPatient) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchInfoPatient>('/patient/', {
		params: filters,
	});
	return convertKeysToCamelCase(response.data);
};

export const useGetInfoPatient = (filters: IFiltersFetchInfoPatient, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['patient', filters] : ['patient'],
		queryFn: async () => await fetchInfoPatient(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
