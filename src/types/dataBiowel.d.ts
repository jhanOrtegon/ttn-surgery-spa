import { type Category } from '@/services/categories/types';

export interface IDataPersistent {
	dataBiowel: {
		idModule: number;
		idUser: number;
		idAccount: number;
		idProfile: number;
		token: string;
	};
	dataSidebar: Category;
}
