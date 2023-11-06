interface IText {
	variant?: 'title' | 'subTitle' | 'text' | 'bigSubTitle';
	color?: 'primary' | 'secondary' | 'gray' | 'darkGray';
	font?: 'normal' | 'bold' | 'semiBold';
	className?: string;
	value: string;
}

export const Text = ({
	variant = 'text',
	color = 'gray',
	className = '',
	font = 'normal',
	value,
}: IText) => {
	const textVariant =
		variant === 'title'
			? 'text-4xl font-bold'
			: variant === 'subTitle'
			? 'text-xl'
			: variant === 'bigSubTitle'
			? 'text-2xl'
			: '';

	const textColor =
		color === 'primary'
			? 'text-primary'
			: color === 'secondary'
			? 'text-secondary'
			: color === 'darkGray'
			? 'text-zinc-500'
			: 'text-zinc-400';

	const textFont = font === 'semiBold' ? 'font-semibold' : font === 'bold' ? 'font-bold' : '';

	return <p className={`${className} ${textVariant} ${textColor} ${textFont} `}>{value}</p>;
};
