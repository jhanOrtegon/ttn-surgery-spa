export interface IValidateInfoWebScrapper {
	affiliate: boolean;
	info: Info;
}

interface Info {
	contractId: number;
	contractName: string;
	corporateClientId: number;
	corporate_client: string;
	crtId: number;
	crtName: string;
	policy: string;
	population: string;
	populationId: number;
	contractDescription: string;
}
