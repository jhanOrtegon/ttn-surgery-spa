// Icons
import { IconSearch, IconCirclePlus } from '@tabler/icons-react';

// Components
import { Button, Card, CardBody, Input } from '@nextui-org/react';

interface IBoxSearch {
	onSearch: () => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	search: string;
	onAddPatient?: () => void;
	labelButtonAddPatient?: string;
}

const classNamesInput = {
	label: 'text-primary font-bold text-md',
	input: ['outline-0', 'text-zinc-600'],
	innerWrapper: 'bg-transparent outline-0',
	inputWrapper: [
		'group-data-[hover=true]:border-primary',
		'group-data-[focus=true]:border-primary',
		'bg-white',
		'border-primary-20 border-1',
		'hover:border-primary',
		'focus-visible:outline-0',
	],
};

export const BoxSearch = ({
	onSearch,
	handleChange,
	search,
	onAddPatient,
	labelButtonAddPatient = 'Inscribir nuevo paciente',
}: IBoxSearch) => {
	return (
		<>
			<Card isBlurred shadow='sm' className='border-primary-20 border-1 rounded-lg'>
				<CardBody className='bg-primary-10 p-4 py-3'>
					<div className='flex gap-x-2 items-end'>
						<Input
							autoFocus
							type='text'
							label='Buscar'
							placeholder='Escribir...'
							labelPlacement='outside'
							variant='bordered'
							radius='lg'
							value={search}
							onChange={handleChange}
							onKeyUp={event => {
								if (event.key === 'Enter') onSearch();
							}}
							endContent={
								<button className='focus:outline-none' type='button' onClick={onSearch}>
									<IconSearch className='cursor-pointer text-primary' size={16} strokeWidth={4} />
								</button>
							}
							classNames={classNamesInput}
						/>
					</div>
				</CardBody>
			</Card>

			{onAddPatient && (
				<Button
					disableRipple
					variant='light'
					data-hover={false}
					data-focus={false}
					data-focus-visible={false}
					data-pressed={false}
					className='hover:bg-transparent hover:underline text-zinc-500 hover:text-primary w-full outline-none'
					startContent={<IconCirclePlus size={20} />}
					onClick={onAddPatient}
				>
					{labelButtonAddPatient}
				</Button>
			)}
		</>
	);
};
