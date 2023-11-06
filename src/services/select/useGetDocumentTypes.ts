// axios
import { HTTP_PAYROLL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseDocumentTypes } from './types';

// utils
import { addSelectionar, convertKeysToCamelCase } from '@/utils';

const fetchDocumentTypes = async () => {
	const response = await HTTP_PAYROLL.get<IResponseDocumentTypes>('/document_types/');

	const results = convertKeysToCamelCase(
		response.data.results?.map(type => ({ ...type, label: type.name, value: type.id })),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetDocumentTypes = () => {
	const query = useQuery({
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: ['documentTypes'],
		queryFn: async () => await fetchDocumentTypes(),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
