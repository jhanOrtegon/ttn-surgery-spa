import React from 'react';
import {
	Navbar as NavbarNext,
	NavbarBrand,
	NavbarContent,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from '@nextui-org/react';

import { IconBuildingHospital, IconPointFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MODULES } from '@/utils';

export const Navbar = () => {
	const router = useRouter();
	return (
		<NavbarNext
			maxWidth='full'
			className='border-b-3 border-b-cyan-500 absolute'
			style={{ height: '64px' }}
		>
			<NavbarBrand className='flex gap-4 items-center'>
				<Image
					width={150}
					height={35}
					className='cursor-pointer'
					// src='https://ttntest.biowel.com.co/static/media/BiowelOrd.ab50795f.svg'
					src='/logoBiowel.svg'
					alt='Biowel-logo'
					onClick={() => {
						router.push(MODULES.surgery.urlBase);
					}}
				/>
				<div className='flex gap-2 items-center text-slate-400'>
					<IconPointFilled size={15} />
					<p className='font-bold text-lg'>Cirugía</p>
				</div>
			</NavbarBrand>

			<NavbarContent as='div' justify='end'>
				<Dropdown placement='bottom-end'>
					<DropdownTrigger>
						<div
							className={[
								'cursor-pointer py-2 px-5 rounded-md w-52 flex justify-around items-center gap-2 ',
								'border-1 border-gray-300 hover:bg-gray-300/20 text-gray-700 font-medium',
							].join(' ')}
						>
							<div className='flex gap-2 items-center'>
								<IconBuildingHospital className='text-gray-500' />
								<div className='text-sm font-semibold text-gray-500'>TTN</div>
							</div>

							<Avatar
								isBordered
								as='button'
								className='transition-transform h-6 w-6 text-primary'
								name='Jason Hughes'
								size='sm'
								src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
							/>
						</div>
					</DropdownTrigger>
					<DropdownMenu aria-label='Profile Actions' variant='flat'>
						<DropdownItem key='profile' className='h-14 gap-2'>
							<p className='font-semibold'>Signed in as</p>
							<p className='font-semibold'>zoey@example.com</p>
						</DropdownItem>
						<DropdownItem key='settings'>My Settings</DropdownItem>
						<DropdownItem key='team_settings'>Team Settings</DropdownItem>
						<DropdownItem key='analytics'>Analytics</DropdownItem>
						<DropdownItem key='system'>System</DropdownItem>
						<DropdownItem key='configurations'>Configurations</DropdownItem>
						<DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
						<DropdownItem key='logout' color='danger'>
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</NavbarNext>
	);
};
