import React from 'react';

import { IconCaretLeftFilled } from '@tabler/icons-react';

import {
	Pagination,
	PaginationItemType,
	type PaginationItemRenderProps,
	cn,
} from '@nextui-org/react';
import { nanoid } from 'nanoid';

interface ICustomPagination {
	onChangePage: (page: number) => void;
	initialPage: number;
	total: number;
	perpage?: number;
	hasDescription?: boolean;
	direction?: 'center' | 'start' | 'end';
}

export const CustomPagination = ({
	onChangePage,
	initialPage = 1,
	total,
	perpage = 10,
	hasDescription = true,
	direction = 'end',
}: ICustomPagination) => {
	const renderItem = ({
		ref,
		value,
		isActive,
		onNext,
		onPrevious,
		setPage,
		className,
		activePage,
	}: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button
					className={cn(className, 'hover:bg-primary-20/50')}
					onClick={() => {
						onNext();
						onChangePage(total === activePage ? activePage : activePage + 1);
					}}
				>
					<IconCaretLeftFilled className='rotate-180 text-primary' size={20} />
				</button>
			);
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button
					className={cn(className, 'hover:bg-primary-20/50')}
					onClick={() => {
						onPrevious();
						onChangePage(activePage === 1 ? activePage : activePage - 1);
					}}
				>
					<IconCaretLeftFilled className='text-primary' size={20} />
				</button>
			);
		}

		if (value === PaginationItemType.DOTS) {
			return <button className={`${className} text-primary`}>...</button>;
		}

		// cursor is the default item
		return (
			<button
				ref={ref}
				className={cn(
					className,
					'text-primary hover:bg-primary-20/50 duration-500 ease-in-out',
					isActive && 'text-primary bg-primary-20/50 font-bold bg-primary',
				)}
				onClick={() => {
					setPage(value);
					onChangePage(value);
				}}
			>
				{value}
			</button>
		);
	};

	return (
		<Pagination
			key={nanoid()}
			size='sm'
			showControls
			total={Math.ceil(Math.ceil(total) / perpage)}
			initialPage={initialPage}
			className={`gap-2 flex justify-${direction}`}
			radius='full'
			renderItem={renderItem}
			variant='light'
		/>
	);
};
