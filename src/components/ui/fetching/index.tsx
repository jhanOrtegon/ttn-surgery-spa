import React, { type CSSProperties } from 'react';

// Component
import { Spinner } from '@nextui-org/react';

interface IFetching {
	isFetching: boolean;
}

export const overrideIsFetching: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	position: 'absolute',
	bottom: 15,
	right: 14,
};

export const Fetching: React.FC<IFetching> = ({ isFetching }) => {
	return isFetching ? <Spinner size='md' style={overrideIsFetching} /> : null;
};
