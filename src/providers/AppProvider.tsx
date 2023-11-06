'use client';

import { useState } from 'react';

// ReactQueryDevtools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Context
import { LoadingContext } from '@/context';

// https query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// next components
import { NextUIProvider } from '@nextui-org/react';
import { Loading } from '@/components/ui/loading';
import { Fetching } from '@/components/ui';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();

	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const toggleLoading = (value: boolean) => {
		setIsLoading(value);
	};

	const toggleFetching = (value: boolean) => {
		setIsFetching(value);
	};

	return (
		<LoadingContext.Provider value={{ isLoading, isFetching, toggleLoading, toggleFetching }}>
			<QueryClientProvider client={queryClient}>
				<NextUIProvider id='box-container'>{children}</NextUIProvider>
				<Loading isLoading={isLoading} />
				<Fetching isFetching={isFetching} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</LoadingContext.Provider>
	);
};
