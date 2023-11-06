export function convertKeysToCamelCase<T>(obj: T): T {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(item => convertKeysToCamelCase(item)) as any as T;
	}

	if (obj.constructor === Object) {
		const camelCaseObj: any = {};

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
				camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
			}
		}

		return camelCaseObj as T;
	}

	return obj;
}
