import { Tooltip } from '@nextui-org/react';

interface IIconNote {
	valueTooltip?: string | React.ReactNode;
	total?: number;
	disabled?: boolean;
	onClick?: () => void;
}

export const IconNote = ({ disabled, onClick, total, valueTooltip = 'Ver notas' }: IIconNote) => {
	return (
		<Tooltip isDisabled={disabled} delay={0} closeDelay={0} content={valueTooltip}>
			<div
				className={`${
					disabled ? 'bg-zinc-300 text-zinc-600' : 'bg-primary text-white cursor-pointer'
				} rounded-md font-bold text-center px-2 text-sm flex items-center truncate min-w-[26px] min-h-[24px] h-fit`}
				onClick={onClick}
			>
				{total || 0}
			</div>
		</Tooltip>
	);
};
