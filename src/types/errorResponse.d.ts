export interface IErrorResponse {
	response: {
		data: {
			message: string;
			statusCode: number;
			success: boolean;
			errorWS?: boolean;
		};
	};
}
