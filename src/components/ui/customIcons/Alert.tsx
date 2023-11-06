import { IconAlertCircleFilled } from '@tabler/icons-react';

import { Tooltip } from '@nextui-org/react';

interface IIconAlert {
	valueTooltip?: string | React.ReactNode;
	className?: string;
	onClick?: () => void;
	size?: number;
	isDisabled?: boolean;
	type?: 'SUCCESS' | 'DANGER';
}

export const IconAlert = ({
	onClick,
	className,
	valueTooltip = 'Riesgo administrativo',
	size = 26,
	type = 'DANGER',
	isDisabled,
}: IIconAlert) => {
	return (
		<Tooltip delay={0} closeDelay={0} content={valueTooltip} isDisabled={isDisabled}>
			<IconAlertCircleFilled
				size={size}
				onClick={onClick}
				className={`${className} ${
					type === 'DANGER' ? 'text-danger-50' : 'text-success-50'
				}  cursor-pointer`}
			/>
		</Tooltip>
	);
};
