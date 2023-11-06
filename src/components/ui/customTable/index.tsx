import React from 'react';

import { nanoid } from 'nanoid';

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from '@nextui-org/react';
import { CustomPagination } from '..';

interface ICustomTable<T> {
	ariaLabel: string;
	rows: T[] | any;
	rowsTotal: number;

	pagination?: {
		initialPage?: number;
		perpage: number;
		onChangePage: (page: number) => void;
	};

	columns: Array<{
		key: string;
		className?: string;
		label: string;
	}>;
}

export const CustomTable = <T,>({
	columns,
	rows,
	ariaLabel,
	pagination,
	rowsTotal,
}: ICustomTable<T>) => {
	const classNames = React.useMemo(
		() => ({
			wrapper: ['p-0'],
			th: ['bg-primary-30', 'text-primary', 'first:rounded-none', 'last:rounded-none'],
			tr: ['hover:bg-primary-30', 'duration-500', 'ease-in-out'],
			td: [
				// changing the rows border radius
				// first
				'border-b-1 border-b-primary-10 border-t-primary-10 border-t-1',
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none',

				'text-[13px]',
			],
		}),
		[],
	);

	return (
		<>
			<Table aria-label={ariaLabel} className='mb-2' classNames={classNames} color='primary'>
				<TableHeader>
					{columns.map(column => (
						<TableColumn className={`text-md ${column?.className ?? ''}`} key={column.key}>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>

				<TableBody emptyContent='No hay datos para mostrar' className='text-zinc-100'>
					{rows
						?.slice(0, pagination?.perpage || rowsTotal)
						?.map((row: Record<string, string | undefined>) => (
							<TableRow key={nanoid()} className={`text-zinc-600`}>
								{columnKey => (
									<TableCell
										className={
											Object?.keys(row).includes(`${columnKey}ClassName`)
												? row[`${columnKey}ClassName`]
												: ''
										}
									>
										{getKeyValue(row, columnKey)}
									</TableCell>
								)}
							</TableRow>
						))}
				</TableBody>
			</Table>

			{pagination && rowsTotal ? (
				<CustomPagination
					onChangePage={pagination.onChangePage}
					total={rowsTotal}
					initialPage={pagination.initialPage || 1}
					perpage={pagination.perpage}
				/>
			) : (
				''
			)}
		</>
	);
};
