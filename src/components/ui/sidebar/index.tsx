import 'simplebar-react/dist/simplebar.min.css';

import { type FC, useRef, useState } from 'react';

import SimpleBar from 'simplebar-react';

import { Image } from '@nextui-org/react';

import { type ISidebar } from './models';

import Link from 'next/link';

import { useSidebarStructure } from '@/hooks';
import { hasData } from '@/utils';

export const Sidebar: FC<ISidebar> = ({ setExpand }) => {
	const sidebarStructure = useSidebarStructure();

	const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
	const [activeName, setActiveName] = useState('');
	const activeLink = typeof window !== 'undefined' ? window.location.pathname : '';

	const listRef = useRef<Record<string, HTMLUListElement | null>>({});

	const [isExpand, setIsExpand] = useState(false);
	const [isExpandOnHover, setIsExpandOnHover] = useState(false);

	const handleHoverExpand = (value: boolean) => {
		if (!isExpand) {
			setIsExpandOnHover(value);
		}
	};

	const handleNavigate = (path: string) => {
		setActiveName(path);
	};

	const handleToggle = (name: string) => {
		const rootEl = name.split('.')[0];

		if (openedMenu[name]?.open === true) {
			setOpenedMenu(prevState => ({
				...prevState,
				[name]: {
					open: false,
					height: '0px',
				},
				[rootEl]: {
					open: rootEl !== name,
					height: `${
						(listRef.current[rootEl]?.scrollHeight ?? 0) -
						(listRef.current[name]?.scrollHeight ?? 0)
					}px`,
				},
			}));
		} else {
			setOpenedMenu(prevState => ({
				...prevState,
				[name]: {
					open: true,
					height: `${listRef.current[name]?.scrollHeight ?? 0}px`,
				},
				[rootEl]: {
					open: true,
					height: `${
						(listRef.current[rootEl]?.scrollHeight ?? 0) +
						(listRef.current[name]?.scrollHeight ?? 0)
					}px`,
				},
			}));
		}
	};

	const generateMenu = (item: any, index: number, recursive: number = 0) => {
		if (activeName === '' && activeLink.includes(item.link)) {
			setActiveName(item.name);
		}
		const classesActive = activeName === item.name ? 'active' : '';

		return (
			<li key={index}>
				<Link
					href={'child' in item ? '' : item.link}
					role='button'
					tabIndex={0}
					id={item.id}
					onClick={() => {
						if ('child' in item) {
							handleToggle(item.name);
						} else if ('link' in item) {
							handleNavigate(item.name);
						}
					}}
					onKeyDown={event => {
						const { code } = event;
						if (code === 'Space') {
							if ('child' in item) {
								handleToggle(item.name);
							} else if ('link' in item) {
								handleNavigate(item.name);
							}
						}
					}}
					className={[
						'group m-0 flex cursor-pointer rounded-lg items-center focus:outline-none',
						'justify-between h-12 py-0 pr-3 mb-1',
						recursive === 0 ? 'pl-5' : recursive === 1 ? 'pl-11' : 'pl-16',
						activeName === item.name || activeName.split('.')[0] === item.name
							? `text-cyan-500 font-semibold ${
									hasData(item.parent) ? 'bg-cyan-50' : 'bg-transparent'
							  }`
							: `text-gray-500 ${hasData(item.parent) && ''}`,
						'hover:bg-gray-300/20',
						classesActive,
					].join(' ')}
				>
					<div className='flex items-center gap-3'>
						{hasData(item.urlIcon) ? (
							<div className='h-4 w-4 flex items-center justify-center'>
								<Image
									src={item.urlIcon}
									alt={item?.title}
									className={
										activeName === item.name || activeName.split('.')[0] === item.name
											? 'rounded-none text-cyan-500'
											: 'rounded-none grayscale'
									}
								/>
							</div>
						) : null}

						<div
							className={`truncate ${isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'}`}
						>
							{item.title}
						</div>
					</div>
					{'child' in item ? (
						<div className={`${isExpand ? '' : isExpandOnHover ? '' : 'w-0 h-0 opacity-0'}`}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d={[
										'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 ',
										'011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
									].join(' ')}
								/>
							</svg>
						</div>
					) : (
						false
					)}
				</Link>
				{'child' in item ? (
					<ul
						ref={el => (listRef.current[item.name] = el)}
						className={[
							'transition-max-height overflow-hidden duration-400 ease-in-out',
							isExpand ? '' : isExpandOnHover ? '' : 'h-0',
						].join(' ')}
						style={{ maxHeight: `${openedMenu[item.name]?.height ?? '0px'}` }}
						key={item.name}
					>
						{item.child.map((value: any, idx: number) => generateMenu(value, idx, recursive + 1))}
					</ul>
				) : (
					false
				)}
			</li>
		);
	};

	return (
		<nav
			role='navigation'
			style={{ top: '67px' }}
			className={[
				'bg-white border-r border-slate-100 shadow-sm absolute inset-y-0 left-0',
				'z-50 duration-500 ease-in-out shadow-xl',
				`${isExpand ? ' w-72' : isExpandOnHover ? 'w-72 backdrop-blur-md' : 'w-20'}`,
			].join(' ')}
		>
			<button
				className={[
					'absolute z-50 top-4 -right-3 bg-white hover:bg-slate-100',
					' text-slate-500 p-0.5 rounded-full border border-slate-200',
				].join(' ')}
				onClick={() => {
					setIsExpand(!isExpand);
					setExpand(!isExpand);
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className={`${isExpand ? 'rotate-0' : 'rotate-180'} transform duration-500 h-4 w-4`}
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d={[
							'M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 ',
							'010-1.414l4-4a1 1 0 011.414 0z',
						].join(' ')}
					/>
				</svg>
			</button>
			<div
				onMouseEnter={() => {
					handleHoverExpand(true);
				}}
				onMouseLeave={() => {
					handleHoverExpand(false);
				}}
				className={'relative h-screen overflow-hidden'}
			>
				<SimpleBar style={{ height: '100%' }} autoHide>
					<div className='text-slate-500 pb-10 pt-7'>
						<div className='mt-3 mb-10 p-0'>
							<ul className='list-none text-sm font-normal px-3'>
								{sidebarStructure?.map((item, index) => generateMenu(item, index))}
							</ul>
						</div>
					</div>
				</SimpleBar>
			</div>
		</nav>
	);
};
