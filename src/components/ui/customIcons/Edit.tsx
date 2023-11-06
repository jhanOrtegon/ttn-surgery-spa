import { IconPencil } from '@tabler/icons-react';

import { Tooltip } from '@nextui-org/react';

interface IIconEdit {
	valueTooltip?: string;
	className?: string;
	onClick?: () => void;
}

export const IconEdit = ({ valueTooltip = 'Editar', onClick, className }: IIconEdit) => {
	return (
		<Tooltip delay={0} closeDelay={0} content={valueTooltip}>
			<IconPencil className={`text-zinc-500 cursor-pointer ${className}`} onClick={onClick} />
		</Tooltip>
	);
};
