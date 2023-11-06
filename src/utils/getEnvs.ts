export const getEnvs = () => {
	// Medical
	const URL_PROTOCOL = process.env.NEXT_PUBLIC_URL_PROTOCOL;
	const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;
	const URL_GATEWAY = process.env.NEXT_PUBLIC_URL_GATEWAY;
	const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
	const URL_MEDICAL = process.env.NEXT_PUBLIC_URL_MEDICAL;

	return {
		URL_BASE,
		URL_GATEWAY,
		API_VERSION,
		URL_MEDICAL,
		URL_PROTOCOL,
	};
};
