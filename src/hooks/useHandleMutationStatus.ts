import { useContext, useEffect } from 'react';

import { type UseMutationResult } from '@tanstack/react-query';
import { LoadingContext } from '@/context';

export const useHandleMutationStatus = (query: UseMutationResult<any, unknown, void, unknown>) => {
	const context = useContext(LoadingContext);

	useEffect(() => {
		if (query.isLoading) {
			context?.toggleLoading(true);
			document.querySelector('#box-container')?.classList.add('customLoading');
		}

		if (!query.isLoading) {
			context?.toggleLoading(false);
			document.querySelector('#box-container')?.classList.remove('customLoading');
		}
	}, [query.isLoading]);
};
