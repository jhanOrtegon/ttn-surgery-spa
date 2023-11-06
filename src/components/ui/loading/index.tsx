// Component
import { type CSSProperties } from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

interface ILoading {
	isLoading: boolean;
	size?: number;
	speedMultiplier?: number;
}

export const overrideIsLoading: CSSProperties = {
	margin: 'auto',
	position: 'absolute',
	bottom: 0,
	right: 0,
	left: 0,
	top: 0,
};

export const Loading = ({ isLoading, size = 60, speedMultiplier = 0.8 }: ILoading) => {
	return (
		<ClipLoader
			color='#00B4CC'
			cssOverride={overrideIsLoading}
			size={size}
			loading={isLoading}
			speedMultiplier={speedMultiplier}
		/>
	);
};
