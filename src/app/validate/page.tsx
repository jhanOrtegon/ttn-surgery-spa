'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { MODULES, hasData, setCookie } from '@/utils';

import { type IParams } from './types';

import { useDataPersistent } from '@/store';

import { Loading } from '@/components/ui';

const defaultDataSidebar = {
	id: 0,
	isExternal: 0,
	modules: [],
	name: '',
	categoryHomeImage: '',
	categoryImage: '',
};

const Validate = ({ searchParams }: IParams) => {
	const router = useRouter();

	const { setDataPersistent } = useDataPersistent();

	const params = searchParams;

	// get url params
	const idModule = params?.idModule;
	const idUser = params?.idUser;
	const idAccount = params?.idAccount;
	const idProfile = params?.idProfile;
	const token = params?.token;

	useEffect(() => {
		if (
			hasData(idUser) &&
			hasData(idModule) &&
			hasData(idProfile) &&
			hasData(idAccount) &&
			hasData(token)
		) {
			const data = {
				idModule: +idModule,
				idUser: +idUser,
				idAccount: +idAccount,
				idProfile: +idProfile,
				token,
			};
			setCookie({ name: 'data-biowel', value: data });
			setDataPersistent({
				dataBiowel: data,
				dataSidebar: defaultDataSidebar,
			});
		} else {
			setCookie({ name: 'data-biowel', value: '' });
			setDataPersistent({
				dataBiowel: { idModule: 0, idUser: 0, idAccount: 0, idProfile: 0, token: '' },
				dataSidebar: defaultDataSidebar,
			});
		}
	}, [idAccount, idModule, idProfile, idUser, setDataPersistent, token]);

	useEffect(() => {
		router.push(MODULES.surgery.urlBase);
	}, [router]);

	return <Loading isLoading />;
};

export default Validate;
