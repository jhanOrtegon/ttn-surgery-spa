// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchCopaymentRate, type IFiltersFetchCopaymentRate } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchCopaymentRate = async (
	filters: IFiltersFetchCopaymentRate,
): Promise<IResponseFetchCopaymentRate> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchCopaymentRate>('/copaymentRate/', {
		params: filters,
	});

	const results = convertKeysToCamelCase(
		response.data.results.map(copaymentRate => ({
			...copaymentRate,
			label: copaymentRate.name,
			value: copaymentRate.id,
		})),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetCopaymentRate = (filters: IFiltersFetchCopaymentRate, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['affiliationTypes', filters] : ['affiliationTypes'],
		queryFn: async () => await fetchCopaymentRate(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
