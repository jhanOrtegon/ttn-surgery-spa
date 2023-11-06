const capitalize = (t: string) => {
	return t[0]?.toUpperCase() + t?.substr(1).toLowerCase();
};

export const capitalizeEachWord = (text: string) => {
	if (text?.trim().length > 0) {
		const words = text.trim().split(' ');
		const wordsCapitalized = words.filter(word => word !== '').map(word => capitalize(word));
		return wordsCapitalized?.join(' ');
	}

	return '';
};
