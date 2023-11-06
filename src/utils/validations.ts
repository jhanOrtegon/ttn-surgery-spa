import * as Yup from 'yup';

export const hasData = (variable: any): boolean => {
	let isValid = false;

	if (typeof variable === 'boolean') {
		isValid = !!variable;
	}

	if (typeof variable === 'string') {
		isValid = variable.trim() !== '';
	}

	if (typeof variable === 'number') {
		isValid = variable > 0;
	}

	if (typeof variable === 'undefined') {
		isValid = false;
	}

	if (typeof variable === 'object') {
		isValid = Object.keys(variable || {}).length > 0;
	}

	if (variable === null) {
		isValid = false;
	}

	return isValid;
};

export const getSchemeValidate = () => {
	const msgFieldRequired = 'Campo requerido';
	const msgFieldNumber = 'Campo numérico';
	const msgFieldNumberPositive = 'Campo invalido';
	const msgFieldStr = 'Campo alfanumérico';
	const msgFieldStrMin = 'Demasiado corto';
	const msgFieldStrMax = 'Demasiado largo';

	const fieldStr = Yup.string().trim().typeError(msgFieldStr);
	const fieldStrRequired = fieldStr.required(msgFieldRequired);
	const fieldNumber = Yup.number().typeError(msgFieldNumber).integer('Solo números enteros');
	const fieldNumberRequired = fieldNumber.required(msgFieldRequired);
	const fieldNumberPositive = fieldNumber.positive(msgFieldNumberPositive);
	const fieldNumberPositiveRequired = fieldNumber
		.positive(msgFieldNumberPositive)
		.required(msgFieldRequired);

	const fieldDocument = fieldNumberPositive.test((value, ctx) => {
		const strValue = String(value);
		if (strValue.length < 5) {
			return ctx.createError({ message: 'Demasiado corto' });
		}
		if (strValue.length > 15) {
			return ctx.createError({ message: 'Demasiado largo' });
		}

		return true;
	});

	const fieldBirthDateRequired = fieldStrRequired.test((value, ctx) => {
		if (value.length < 10) {
			return ctx.createError({ message: 'Fecha invalida' });
		}
		if (value.length > 10) {
			return ctx.createError({ message: 'Fecha invalida' });
		}
		const valueSplit = value?.split('-');
		if (Number(valueSplit[0]) < 1920) {
			return ctx.createError({ message: 'Fecha invalida' });
		}

		return true;
	});

	const fieldAge = fieldNumberPositive.max(110, msgFieldStrMax);
	const fieldAgeRequired = fieldNumberPositiveRequired.max(110, msgFieldStrMax);

	const fieldDocumentRequired = fieldDocument.required(msgFieldRequired);

	const fieldCellPhone = fieldNumberPositive.test((value, ctx) => {
		const strValue = String(value);
		if (strValue.length < 10) {
			return ctx.createError({ message: 'Demasiado corto' });
		}

		if (strValue.length > 10) {
			return ctx.createError({ message: 'Demasiado largo' });
		}

		return true;
	});

	const fieldCellPhoneRequired = fieldCellPhone.required(msgFieldRequired);

	const fieldHomePhone = fieldNumberPositive.test((value, ctx) => {
		const strValue = String(value);
		if (strValue.length < 7) {
			return ctx.createError({ message: 'Demasiado corto' });
		}

		if (strValue.length > 10) {
			return ctx.createError({ message: 'Demasiado largo' });
		}

		return true;
	});

	const fieldHomePhoneRequired = fieldHomePhone.required(msgFieldRequired);

	const fieldPhone = fieldNumberPositive.test((value, ctx) => {
		const strValue = String(value);
		if (strValue.length < 7) {
			return ctx.createError({ message: 'Demasiado corto' });
		}

		if (strValue.length > 7) {
			return ctx.createError({ message: 'Demasiado largo' });
		}

		return true;
	});

	const fieldPhoneRequired = fieldPhone.required(msgFieldRequired);

	const fieldEmail = Yup.string().email('Formato incorrecto').typeError(msgFieldStr);
	const fieldEmailRequired = fieldEmail.required(msgFieldRequired);

	return {
		msgFieldRequired,
		msgFieldNumber,
		msgFieldNumberPositive,
		msgFieldStrMin,
		msgFieldStrMax,
		msgFieldStr,

		fieldStr,
		fieldNumber,
		fieldNumberPositive,
		fieldStrRequired,
		fieldNumberRequired,
		fieldNumberPositiveRequired,

		fieldDocument,
		fieldCellPhone,
		fieldPhone,
		fieldDocumentRequired,
		fieldCellPhoneRequired,
		fieldPhoneRequired,
		fieldEmail,
		fieldEmailRequired,
		fieldAge,
		fieldAgeRequired,
		fieldHomePhoneRequired,
		fieldHomePhone,
		fieldBirthDateRequired,
	};
};
