// react and next
import React from 'react';
import type { Metadata } from 'next';

// font
import { PT_Sans } from 'next/font/google';

// css
import '@/styles/globals.css';

// import styles 👇
import 'react-modern-drawer/dist/index.css';

import { AppProvider } from '@/providers';

const ptSans = PT_Sans({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

interface Props {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: 'Biowel - Cirugías',
	description: 'Modulo de programación de cirugías',
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang='es'>
			<head>
				<link
					rel='shortcut icon'
					href='https://ttnsalud-biowel-claser.s3.us-east-2.amazonaws.com/favicon.svg'
				/>
				<meta
					name='viewport'
					content='minimum-scale=1,initial-scale=1,width=device-width,user-scalable=no'
				/>
			</head>
			<body className={`${ptSans.className} overflow-hidden`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
