import { useContext, useEffect } from 'react';

import { type UseQueryResult } from '@tanstack/react-query';

import { LoadingContext } from '@/context';

import { customAlertError } from '@/utils';

interface IErrorResponse {
	response: {
		data: {
			message: string;
		};
	};
}

export const useHandleQueryStatus = (query: UseQueryResult) => {
	const context = useContext(LoadingContext);

	useEffect(() => {
		if (query.isLoading && query.isFetching) {
			context?.toggleLoading(true);
			document.querySelector('#box-container')?.classList.add('customLoading');
		}

		if (query.isFetching && !query.isLoading) {
			context?.toggleFetching(true);
		}

		if (!query.isLoading) {
			context?.toggleLoading(false);
			document.querySelector('#box-container')?.classList.remove('customLoading');
		}

		if (!query.isFetching) {
			context?.toggleFetching(false);
		}

		if (query.isError) {
			const { response } = query.error as IErrorResponse;
			void customAlertError({ message: response?.data?.message });
		}
	}, [query.isLoading, query.isFetching, query.isError]);
};
