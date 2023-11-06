'use client';

import { useEffect } from 'react';

// nanoId
import { nanoid } from 'nanoid';

// store
import { useDataPersistent } from '@/store';

// hooks
import { useSidebarStructure } from '@/hooks';

// services
import { useGetCategories } from '@/services';

// components
import Link from 'next/link';
import { GeneralLayout } from '@/components/layout';
import { Accordion, AccordionItem, Image } from '@nextui-org/react';
import { hasData } from '@/utils';

const Surgery = () => {
	const { dataBiowel, dataSidebar, setDataPersistent } = useDataPersistent();

	const { idProfile, idModule } = dataBiowel;

	const categories = useSidebarStructure();

	const query = useGetCategories({
		id_profile: idProfile,
		categoryId: idModule,
	});

	const itemClasses = {
		base: 'pb-0 w-auto',
		title:
			'text-xl text-gray-500 font-extrabold hover:text-danger duration-200 ease-in-out py-0 my-0',
		trigger: 'pb-1',
		indicator: 'hidden',
		content: 'text-base px-5',
	};

	useEffect(() => {
		if (hasData(query.data)) {
			setDataPersistent({
				dataBiowel,
				dataSidebar: query.data?.all_Categories?.[0]!,
			});
		}
	}, [dataSidebar, query.data, query.data?.all_Categories, setDataPersistent]);

	return (
		<GeneralLayout title='Módulo de Cirugías' isHome onBack={false}>
			{categories?.map((category, index) => (
				<Accordion key={nanoid()} className='p-0' itemClasses={itemClasses} showDivider={false}>
					<AccordionItem
						key={nanoid()}
						aria-label={category.title}
						title={category.title}
						className='mb-2 w-fit'
						indicator={false}
					>
						{category.child.map(subCategory => (
							<div
								key={nanoid()}
								className={[
									'text-gray-400 hover:text-primary font-bold',
									'duration-200 ease-in-out cursor-pointer',
								].join(' ')}
							>
								<Link href={subCategory.link}>{subCategory.title}</Link>
							</div>
						))}
					</AccordionItem>
				</Accordion>
			))}

			<div className='absolute bottom-12 right-12'>
				<Image
					width={555}
					height={346}
					src={dataSidebar?.categoryHomeImage ?? ''}
					alt={`Home ${dataSidebar?.name}`}
				/>
			</div>
		</GeneralLayout>
	);
};

export default Surgery;
