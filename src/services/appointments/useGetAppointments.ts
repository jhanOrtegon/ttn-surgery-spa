// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchAppointments, type IFiltersFetchAppointments } from './types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchAppointments = async (
	filters: IFiltersFetchAppointments,
): Promise<IResponseFetchAppointments> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchAppointments>('/appointment/', {
		params: filters,
	});

	return {
		...response.data,
		results: convertKeysToCamelCase(response.data.results),
	};
};

export const useGetAppointments = (filters: IFiltersFetchAppointments, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['appointments', filters] : ['appointments'],
		queryFn: async () => await fetchAppointments(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
