// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchPendingOrders, type IResponseFetchPendingOrders } from './types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchPendingOrders = async (filters: IFiltersFetchPendingOrders) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchPendingOrders>('/patient/service/', {
		params: filters,
	});

	return {
		...response.data,
		results: convertKeysToCamelCase(response.data.results),
	};
};

export const useGetPendingOrders = (filters: IFiltersFetchPendingOrders, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['pendingOrders', filters] : ['pendingOrders'],
		queryFn: async () => await fetchPendingOrders(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
