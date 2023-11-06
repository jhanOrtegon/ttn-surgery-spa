// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchComments, type IResponseFetchComments } from './types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchComments = async (filters: IFiltersFetchComments) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchComments>('/comments/', {
		params: filters,
	});

	return {
		...response.data,
		results: convertKeysToCamelCase(response.data.results),
	};
};

export const useGetComments = (filters: IFiltersFetchComments, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: true,
		queryKey: hasData(filters) ? ['comments', filters] : ['comments'],
		queryFn: async () => await fetchComments(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
