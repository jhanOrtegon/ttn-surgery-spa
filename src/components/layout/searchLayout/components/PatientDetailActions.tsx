// types
import { type TAction } from '../types';

// components
import { IconEdit, IconNote, IconAlert } from '@/components/ui';

interface IPatientDetailActions {
	className?: string;
	onClickAction: (action: TAction) => void;
	hideEdit?: boolean;
	totalNotes: number;
}

export const PatientDetailActions = ({
	onClickAction,
	hideEdit,
	className,
	totalNotes,
}: IPatientDetailActions) => {
	return (
		<div className={`flex gap-x-3 justify-end ${className}`}>
			{!hideEdit && <IconEdit onClick={() => onClickAction('EDIT')} />}
			<IconNote total={totalNotes} onClick={() => onClickAction('NOTE')} />
			<IconAlert onClick={() => onClickAction('IMPORTANCE_ADMIN')} />
		</div>
	);
};
