import React from 'react';

// import component 👇
import Drawer from 'react-modern-drawer';

// import styles 👇
import 'react-modern-drawer/dist/index.css';

import { Close, Text } from '..';
import { ScrollShadow } from '@nextui-org/react';

interface ICustomDrawer {
	open: boolean;
	onClose?: () => void;
	direction: 'left' | 'right' | 'top' | 'bottom';
	lockBackgroundScroll?: boolean;
	children: React.ReactNode;
	duration?: number;
	overlayOpacity?: number;
	overlayColor?: string;
	enableOverlay?: boolean;
	style?: React.CSSProperties;
	zIndex?: number;
	size: 'lg' | 'md' | 'sm' | 'xs' | 'full' | number;
	className?: string;
	customIdSuffix?: string;
	overlayClassName?: string;
	title: string;
	footer?: React.ReactNode;
	hasFooter?: boolean;
}

export const CustomDrawer = (props: ICustomDrawer) => {
	const { size } = props;

	const customSize =
		size === 'full'
			? `${100}vw`
			: size === 'lg'
			? `${75}vw`
			: size === 'md'
			? `${50}vw`
			: size === 'sm'
			? `${400}vw`
			: size === 'xs'
			? 340
			: size;

	return (
		<Drawer
			{...props}
			className={`${props.className} flex flex-col p-5 pb-7 px-7 max-h-full overflow-auto`}
			size={customSize}
		>
			<div>
				<Close color='darkGray' onClick={props.onClose ? props.onClose : () => {}} />

				<Text
					className='mb-7 mt-14'
					value={props.title}
					color='secondary'
					variant='title'
					font='bold'
				/>
			</div>

			<ScrollShadow
				hideScrollBar
				className={`${!props.hasFooter ? '' : 'h-3/6 overflow-y-scroll'}`}
			>
				{props?.children}
			</ScrollShadow>

			<div className='mt-auto'>{props?.footer && props.hasFooter ? props?.footer : ''}</div>
		</Drawer>
	);
};
