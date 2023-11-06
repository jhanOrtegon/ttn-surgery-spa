'use client';

import { GeneralLayout, SearchLayout } from '@/components/layout';
import React from 'react';

const GenerateSurgeryQuotePage = () => {
	return (
		<GeneralLayout title='GenerateSurgeryQuotePage' hasBody={false}>
			<SearchLayout title={'Generar cotización'}></SearchLayout>
		</GeneralLayout>
	);
};

export default GenerateSurgeryQuotePage;
