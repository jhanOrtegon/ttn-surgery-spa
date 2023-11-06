export const calculateAge = (birthDate: Date): number => {
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();

	// Check if the birthday has already occurred this year or not
	if (
		birthDate.getMonth() > currentDate.getMonth() ||
		(birthDate.getMonth() === currentDate.getMonth() && birthDate.getDate() > currentDate.getDate())
	) {
		return age - 1;
	} else {
		return age;
	}
};
