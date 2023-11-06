import { useEffect, useState } from 'react';

// store
import { useDataPersistent } from '@/store';

interface ISidebarStructure {
	id: string;
	title: string;
	name: string;
	parent: boolean;
	urlIcon: string;
	child: Array<{
		id: number;
		title: string;
		name: string;
		link: string;
	}>;
}

export const useSidebarStructure = () => {
	const [structure, setStructure] = useState<ISidebarStructure[]>([]);
	const { dataSidebar } = useDataPersistent();

	useEffect(() => {
		const formatDataSidebar = dataSidebar?.modules?.map(module => {
			return {
				id: module.name,
				title: module.name,
				name: module.name,
				parent: true,
				urlIcon: module.img,
				child: module.functionalities.map(functionality => {
					return {
						id: functionality.id_module,
						title: functionality.name,
						name: `${module.name}.${functionality.name}`,
						link: functionality.url,
					};
				}),
			};
		}) as unknown as ISidebarStructure[];

		setStructure(formatDataSidebar);
	}, [dataSidebar]);

	return structure;
};
