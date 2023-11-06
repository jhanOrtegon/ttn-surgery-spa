// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import {
	type IResponseFetchContractPopulation,
	type IFiltersFetchContractPopulation,
} from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchContractPopulation = async (
	filters: IFiltersFetchContractPopulation,
): Promise<IResponseFetchContractPopulation> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchContractPopulation>(
		'/client/contractpopulation/',
		{
			params: filters,
		},
	);

	const results = convertKeysToCamelCase(
		response.data.results.map(population => ({
			...population,
			label: population.name,
			value: population.idPopulation,
		})),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetContractPopulations = (
	filters: IFiltersFetchContractPopulation,
	enabled = true,
) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		queryKey: hasData(filters) ? ['contractPopulations', filters] : ['contractPopulations'],
		queryFn: async () => await fetchContractPopulation(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
