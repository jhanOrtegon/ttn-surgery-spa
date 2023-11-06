import { IconX } from '@tabler/icons-react';

interface IClose {
	isBlock?: boolean;
	size?: number;
	className?: string;
	onClick: () => void;
	color: 'primary' | 'secondary' | 'gray' | 'darkGray';
}

export const Close = ({ size = 25, className, onClick, color = 'gray', isBlock }: IClose) => {
	const customColor =
		color === 'gray'
			? 'text-zinc-300 hover:text-zinc-600'
			: color === 'darkGray'
			? 'hover:text-zinc-400 text-zinc-500'
			: color === 'secondary'
			? 'text-secondary/60 hover:text-secondary'
			: 'text-primary/60 hover:text-primary';

	return (
		<IconX
			className={`${customColor} duration-400 ease-in-out cursor-pointer ${
				!isBlock && 'absolute'
			}  ${className}`}
			strokeWidth={3}
			size={size}
			onClick={onClick}
		/>
	);
};
