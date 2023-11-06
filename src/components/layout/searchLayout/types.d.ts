export interface ISearchLayout {
	children?: React.ReactNode;
	title: string;
	onBack?: boolean;
	hasBody?: boolean;
}

type TAction = 'DETAIL' | 'EDIT' | 'CREATE' | 'IMPORTANCE_ADMIN' | 'IMPORTANCE_ASIS' | 'NOTE';
