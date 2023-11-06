import { type IPatient } from '@/types';

// utils
import { hasData, capitalizeEachWord } from '@/utils';

// icons
import { IconChevronRight } from '@tabler/icons-react';

interface IListPatient {
	listPatient: IPatient[];
	onSelectedPatient: ({ active, data }: { active: boolean; data: IPatient }) => void;
}

export const ListPatient = ({ listPatient, onSelectedPatient }: IListPatient) => {
	return (
		<>
			<div>
				{listPatient?.map(patient => (
					<div
						key={patient?.id}
						className='last:border-b-primary-20 last:border-b-1  flex items-center justify-between py-2 text-sm px-4 hover:bg-primary-10 ease-in-out duration-300 cursor-pointer h-14 border-t-primary-20 border-t-1'
						onClick={() => onSelectedPatient({ active: true, data: patient })}
					>
						<div className='flex justify-center flex-col'>
							<div className='text-zinc-500 font-semibold'>
								{`
									${capitalizeEachWord(patient?.firstName ?? '')}
									${capitalizeEachWord(patient?.otherNames ?? '')}
									${capitalizeEachWord(patient?.lastName ?? '')}
									${capitalizeEachWord(patient?.secondSurname ?? '')}
								`}
							</div>
							<div className='text-md text-zinc-500'>
								{patient?.docTypeDesc} {patient?.document}
							</div>
						</div>

						<IconChevronRight className='text-zinc-500' />
					</div>
				))}
			</div>

			{listPatient?.length >= 1 && listPatient?.length < 6 && hasData(listPatient?.at(-1)) && (
				<div className='py-2 px-4 text-sm text-zinc-500'>
					({listPatient?.length}) {`resultado${listPatient?.length > 1 ? 's' : ''}`}
				</div>
			)}
		</>
	);
};
