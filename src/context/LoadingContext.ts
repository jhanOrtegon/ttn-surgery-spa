import { createContext } from 'react';

export interface IContext {
	isLoading: boolean;
	isFetching: boolean;
	toggleLoading: (value: boolean) => void;
	toggleFetching: (value: boolean) => void;
}

export const LoadingContext = createContext<IContext>({
	isLoading: false,
	isFetching: false,
	toggleLoading: function (value: boolean): void {
		throw new Error('Function not implemented.');
	},
	toggleFetching: function (value: boolean): void {
		throw new Error('Function not implemented.');
	},
});
