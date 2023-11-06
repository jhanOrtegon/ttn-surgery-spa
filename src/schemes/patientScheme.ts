import * as Yup from 'yup';

import { getSchemeValidate } from '@/utils';

const {
	fieldDocumentRequired,
	fieldCellPhoneRequired,
	fieldEmailRequired,
	fieldAgeRequired,
	fieldHomePhone,
	fieldStr,
	fieldStrRequired,
	msgFieldStrMin,
	msgFieldStrMax,
	fieldNumberPositiveRequired,
	fieldBirthDateRequired,
} = getSchemeValidate();

export const patientScheme = Yup.object().shape({
	docTypeId: fieldNumberPositiveRequired,
	document: fieldDocumentRequired,
	firstName: fieldStrRequired.min(1, msgFieldStrMin).max(15, msgFieldStrMax),
	otherNames: fieldStr.min(1, msgFieldStrMin).max(15, msgFieldStrMax),
	lastName: fieldStrRequired.min(1, msgFieldStrMin).max(15, msgFieldStrMax),
	secondSurname: fieldStrRequired.min(1, msgFieldStrMin).max(15, msgFieldStrMax),
	birthDate: fieldBirthDateRequired,
	age: fieldAgeRequired,
	whatsapp: fieldCellPhoneRequired,
	gender: fieldStrRequired,
	affiliationTypeId: fieldNumberPositiveRequired,
	email: fieldEmailRequired,
	maritalStatus: fieldStr,
	provinceId: fieldNumberPositiveRequired,
	cityId: fieldNumberPositiveRequired,
	homeAddress: fieldStrRequired.min(6, msgFieldStrMin).max(50, msgFieldStrMax),
	bloodType: fieldStrRequired,
	cellphone: fieldCellPhoneRequired,
	homephone: fieldHomePhone,
	mandatoryCorporateClientId: fieldNumberPositiveRequired,
	mandatoryContractId: fieldNumberPositiveRequired,
	mandatoryPopulationId: fieldNumberPositiveRequired,
	mandatoryCrtId: fieldNumberPositiveRequired,
	contracts: Yup.array().of(
		Yup.object().shape({
			companyTypeTag: fieldStrRequired,
			corporateClientId: fieldNumberPositiveRequired,
			contractId: fieldNumberPositiveRequired,
			policy: fieldStr.min(1, msgFieldStrMin).max(50, msgFieldStrMax),
		}),
	),
});
