// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IFiltersFetchImportances, type IResponseFetchImportances } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchImportances = async (filters: IFiltersFetchImportances) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchImportances>('/markups/', {
		params: filters,
	});

	const results = convertKeysToCamelCase(
		response.data.results.map(importance => ({
			...importance,
			label: importance.label,
			value: importance.id,
		})),
	);

	addSelectionar(results);

	return { data: results };
};

export const useGetImportances = (filters: IFiltersFetchImportances, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['imporantces', filters] : ['imporantces'],
		queryFn: async () => await fetchImportances(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
