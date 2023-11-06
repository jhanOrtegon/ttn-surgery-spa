import { type IDataPersistent } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IUseDataPersistent extends IDataPersistent {
	setDataPersistent: (data: IDataPersistent) => void;
}

export const useDataPersistent = create<IUseDataPersistent>()(
	devtools(
		persist(
			set => ({
				dataBiowel: {
					idModule: 0,
					idUser: 0,
					idAccount: 0,
					idProfile: 0,
					token: '',
				},
				dataSidebar: {
					id: 0,
					isExternal: 0,
					modules: [],
					name: '',
					categoryHomeImage: '',
					categoryImage: '',
				},
				setDataPersistent: payload => {
					set(state => ({ ...state, ...payload }));
				},
			}),
			{
				name: 'data-biowel-storage',
			},
		),
	),
);
