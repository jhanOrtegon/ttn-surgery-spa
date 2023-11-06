const surgery = {
	urlBase: '/surgery',
};

const authorizations = {
	urlBase: surgery.urlBase + '/authorizations',
	authorizeDiscounts: '/authorize-discounts',
	authorizeScheduleAdditionalSpace: '/authorize-schedule-additional-space',
};

const quotes = {
	urlBase: surgery.urlBase + '/quotes',
	generateSurgeryQuote: '/generate-surgery-quote',
	surgeryQuotesHistory: '/surgery-quotes-history',
};

const specialistSchedule = {
	urlBase: surgery.urlBase + '/specialist-schedule',
};

const surgeriesHistory = {
	urlBase: surgery.urlBase + '/surgeries-history',
};

const surgeryAdmission = {
	urlBase: surgery.urlBase + '/surgery-admission',
};

const surgeryConsents = {
	urlBase: surgery.urlBase + '/surgery-consents',
};

const surgeryPaymentCertificate = {
	urlBase: surgery.urlBase + '/surgery-payment-certificate',
};

const surgeryScheduling = {
	urlBase: surgery.urlBase + '/surgery-scheduling',
};

export const MODULES = {
	surgery,
	authorizations,
	quotes,
	specialistSchedule,
	surgeriesHistory,
	surgeryAdmission,
	surgeryConsents,
	surgeryPaymentCertificate,
	surgeryScheduling,
};
