export const addSelectionar = (data: any[]) => {
	const isExistSelectionar = data?.filter(el => el.value === '').length;

	if (isExistSelectionar) {
		return data;
	}

	const selectionar = { value: '', label: 'Seleccionar...' };

	return data.unshift(selectionar);
};
