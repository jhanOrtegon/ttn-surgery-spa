// icons
import { IconChevronLeft } from '@tabler/icons-react';

// types
import { type TAction } from '../types';

// components
import { PatientDetailActions } from '.';

interface IPatientBasicInfoHeader {
	onBack: () => void;
	totalNotes: number;
	onClickAction: (action: TAction) => void;
}

export const PatientBasicInfoHeader = ({
	onBack,
	onClickAction,
	totalNotes,
}: IPatientBasicInfoHeader) => {
	return (
		<div className='mb-4 flex items-center justify-between'>
			<IconChevronLeft
				className='text-primary ml-[-5px] cursor-pointer'
				onClick={onBack}
				strokeWidth={3}
			/>

			<PatientDetailActions
				totalNotes={totalNotes}
				hideEdit
				onClickAction={action => onClickAction(action)}
			/>
		</div>
	);
};
