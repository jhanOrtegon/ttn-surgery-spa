// types
import { type IComment } from '@/types';

// icons
import { IconTrash } from '@tabler/icons-react';

// Component
import { Card, Tooltip } from '@nextui-org/react';
import { capitalizeEachWord } from '../../../utils/capitalizeEachWord';

// interfaces
interface ICardNote extends IComment {
	onDelete: (id: number, comment: string) => void;
}

export const CardNote = ({ comment, date, id, userId, userName, onDelete }: ICardNote) => {
	return (
		<Card
			shadow={'none'}
			radius={'none'}
			className='mb-4 p-2 border-b-2 border-b-content2 hover:rounded-md hover:bg-zinc-200/30'
		>
			<div className='flex gap-4 justify-between items-center'>
				<div className='text-secondary text-[17px]'>{capitalizeEachWord(userName)}</div>

				<Tooltip delay={0} closeDelay={0} content={'Eliminar'}>
					<IconTrash
						className='text-secondary/80 cursor-pointer'
						size={20}
						onClick={() => onDelete(id, comment)}
					/>
				</Tooltip>
			</div>

			<div className='text-zinc-500'>{comment}</div>
			<div className='text-zinc-500 text-right w-full text-sm '>{date}</div>
		</Card>
	);
};
