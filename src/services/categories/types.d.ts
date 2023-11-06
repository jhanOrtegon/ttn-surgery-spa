export interface IFiltersFetchCategories {
	categoryId: number;
	id_profile: number;
}

export interface IResponseFetchCategories {
	success: boolean;
	all_Categories: Category[];
}

export interface Category {
	id: number;
	isExternal: number;
	modules: Module[];
	name: string;
	categoryHomeImage: string;
	categoryImage: string;
}

export interface Module {
	functionalities: Functionality[];
	id: number;
	id_category: number;
	img: string;
	name: string;
}

export interface Functionality {
	id: number;
	id_module: number;
	name: string;
	permissions: Permission[];
	prefix: string;
	url: string;
}

export interface Permission {
	id: number;
	id_profile: number;
	read: number;
}
