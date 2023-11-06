'use client';

import React, { type FC, useState } from 'react';

// types
import { type IGeneralLayout } from './types';

// Utils
import { hasData } from '@/utils';

// icons
import { IconArrowLeft } from '@tabler/icons-react';

// components
import { Sidebar, Navbar } from '@/components/ui/';
import { useRouter } from 'next/navigation';

export const GeneralLayout: FC<IGeneralLayout> = ({
	children,
	title,
	isHome,
	onBack = true,
	hasBody = true,
}) => {
	const router = useRouter();

	const [sideMenuIsExpand, setSideMenuIsExpand] = useState(false);

	return (
		<>
			<Navbar />
			<Sidebar setExpand={setSideMenuIsExpand} />
			<div
				className={`flex-1  mx-0 duration-700 ease-in-out ${sideMenuIsExpand ? 'ml-72' : 'ml-20'}`}
				style={{ paddingTop: '67px' }}
			>
				{hasBody ? (
					<div
						className='w-full overflow-auto py-10 pl-10 pr-16 leading-normal'
						style={{ height: 'calc(100vh - 67px)' }}
					>
						<div
							className={
								isHome === true
									? 'text-5xl font-bold mb-3 text-cyan-500'
									: 'flex gap-x-3 text-4xl font-bold mb-3 text-cyan-500'
							}
						>
							{hasData(onBack) && (
								<IconArrowLeft
									className='cursor-pointer'
									height={40}
									strokeWidth={3}
									width={40}
									onClick={() => {
										router.back();
									}}
								/>
							)}

							<div>{title}</div>
						</div>
						<div style={!hasData(isHome) ? { marginLeft: '54px' } : {}}>{children}</div>
					</div>
				) : (
					<div
						className='w-full overflow-auto leading-normal'
						style={{ height: 'calc(100vh - 67px)' }}
					>
						{children}
					</div>
				)}
			</div>
		</>
	);
};
