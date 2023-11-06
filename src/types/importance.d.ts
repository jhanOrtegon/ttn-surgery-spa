export interface IImportance {
	bgColor?: string;
	description?: string;
	fontColor?: string;
	id: number;
	label?: string;
	patientQty?: number;
	status?: 'enabled' | 'disabled';
	statusDescription?: string;
}
