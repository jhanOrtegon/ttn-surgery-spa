'use client'

import { MODULES } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		router.push(MODULES.surgery.urlBase);
	}, [router]);
	return <></>;
};

export default Home;
