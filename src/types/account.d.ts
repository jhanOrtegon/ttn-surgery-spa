import { type IResponse } from './http';

export interface IAccount extends IResponse {
	id: number;
	nit: string;
	name: string;
	email: string;
	phone: string;
	active: number;
	address: string;
	profile: Profile[];
	name_bank: null;
	created_at: Date;
	entityLogo: string;
	updated_at: Date;
	bussines_name: string;
	contractOperators: null;
	modules: null;
}

export interface Profile {
	id: number;
	area: string;
	nombre: string;
	prefijo: string;
	permission: Permission[];
}

export interface Permission {
	edit: number;
	read: number;
	create: number;
	delete: number;
	reject: number;
	approve: number;
	functionality: Functionality;
	id_functionality: number;
}

export interface Functionality {
	name: string;
	prefix: string;
	id_module: number;
}
