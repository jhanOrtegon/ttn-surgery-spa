// axios
import { HTTP_SECURITY } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchCategories, type IResponseFetchCategories } from './types';

// utils
import { hasData } from '@/utils';

const fetchCategories = async (filters: IFiltersFetchCategories) => {
	const response = await HTTP_SECURITY.get<IResponseFetchCategories>('/permission/category/', {
		params: filters,
	});
	return response.data;
};

export const useGetCategories = (filters: IFiltersFetchCategories, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['categories', filters] : ['categories'],
		queryFn: async () => await fetchCategories(filters),
		staleTime: 1000 * 60 * 60,
	});

	useHandleQueryStatus(query);

	return { ...query };
};
