// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchClientContract, type IFiltersFetchClientContract } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchClientContract = async (
	filters: IFiltersFetchClientContract,
): Promise<IResponseFetchClientContract> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchClientContract>('/client/contract/', {
		params: filters,
	});

	const results = convertKeysToCamelCase(
		response.data.results.map(contract => ({
			...contract,
			label: contract.name,
			value: contract.id,
		})),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetClientContracts = (filters: IFiltersFetchClientContract, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		queryKey: hasData(filters) ? ['ClientContracts', filters] : ['ClientContracts'],
		queryFn: async () => await fetchClientContract(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
