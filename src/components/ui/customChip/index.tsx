interface ICustomChip {
	value: string;
	color: 'success' | 'warning' | 'gray' | 'secondary';
}

export const CustomChip = ({ color, value }: ICustomChip) => {
	const newColor =
		color === 'success'
			? 'bg-success/10 text-success'
			: color === 'warning'
			? 'bg-warning/10 text-warning'
			: color === 'secondary'
			? 'bg-secondary/10 text-secondary'
			: 'bg-zinc-200 text-zinc';

	return (
		<div
			className={`p-1 px-2 text-[13px] w-56 text-ellipsis overflow-hidden rounded-lg max-w-[130px] truncate ${newColor}`}
		>
			{value}
		</div>
	);
};
